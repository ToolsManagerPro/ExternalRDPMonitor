import streamlit as st
import pandas as pd
from datetime import datetime
import plotly.express as px
import plotly.graph_objects as go
import numpy as np

# Page configuration
st.set_page_config(
    page_title="Status Pro Monitor",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Your data (matching your React constants)
MOCK_PACKS = [
    # Add your 35 pack entries here
    {"name": "Pack17", "entity": "ECM4", "rdpServer": "144.126.129.103", 
     "previous": {"ok": 369, "total": 2332, "notOk": 1963},
     "current": {"ok": 673, "total": 2334, "notOk": 1661},
     "platform": "iMACROS", "disk": "1.74 TB"},
    # ... add all 35 packs
]

ENTITIES = ["ECM4", "ECM7", "ECM10"]
RDP_SERVERS = ["144.126.129.103", "144.126.130.165", "144.91.119.93", 
               "154.53.51.40", "161.97.145.244", "161.97.158.158",
               "178.18.246.243", "178.18.246.248", "185.193.66.147",
               "185.216.75.117", "194.163.130.102", "194.163.144.27",
               "194.163.145.187", "207.244.243.33", "5.39.222.70",
               "66.94.120.85", "66.94.123.3", "70.36.107.56"]

def main():
    # Header
    col1, col2, col3 = st.columns([2, 3, 1])
    with col1:
        st.markdown("""
        <div style='background-color: #0f172a; padding: 12px; border-radius: 16px; 
                    color: white; display: inline-block; margin-bottom: 10px;'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" 
                 viewBox="0 0 24 24" stroke="currentColor" style='margin-right: 8px;'>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" 
                      d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
        </div>
        """, unsafe_allow_html=True)
        
        st.markdown("### Status Pro Monitor")
        st.markdown("Console v3.1 • Updated " + datetime.now().strftime("%H:%M:%S"))
    
    with col2:
        search_query = st.text_input(
            "Find node or pack reference...",
            placeholder="Search packs or RDP servers...",
            label_visibility="collapsed"
        )
    
    with col3:
        st.markdown("""
        <div style='background-color: #d1fae5; padding: 8px 12px; border-radius: 12px; 
                    border: 1px solid #a7f3d0; display: inline-flex; align-items: center;'>
            <span style='margin-right: 8px; position: relative;'>
                <span style='position: absolute; height: 6px; width: 6px; background-color: #10b981; 
                            border-radius: 50%; animation: ping 1s cubic-bezier(0,0,0.2,1) infinite;'></span>
                <span style='height: 6px; width: 6px; background-color: #059669; border-radius: 50%; 
                            position: relative; display: block;'></span>
            </span>
            <span style='font-size: 9px; font-weight: 900; color: #065f46; text-transform: uppercase; 
                        letter-spacing: 0.2em;'>System Live</span>
        </div>
        """, unsafe_allow_html=True)
    
    st.divider()
    
    # Sidebar filters
    with st.sidebar:
        st.header("🔍 Filters")
        
        selected_entities = st.multiselect(
            "Select Entities",
            ENTITIES,
            default=ENTITIES
        )
        
        selected_rdps = st.multiselect(
            "Select RDP Servers",
            RDP_SERVERS,
            default=RDP_SERVERS
        )
        
        if st.button("Apply Filters", type="primary"):
            st.rerun()
        
        if st.button("Reset Filters"):
            selected_entities = ENTITIES
            selected_rdps = RDP_SERVERS
            st.rerun()
    
    # Convert to DataFrame for filtering
    df = pd.DataFrame(MOCK_PACKS)
    
    # Apply filters
    if selected_entities:
        df = df[df['entity'].isin(selected_entities)]
    if selected_rdps:
        df = df[df['rdpServer'].isin(selected_rdps)]
    if search_query:
        df = df[df['name'].str.contains(search_query, case=False) | 
                df['rdpServer'].str.contains(search_query)]
    
    # Display active filters
    if selected_entities or selected_rdps:
        col1, col2 = st.columns([3, 1])
        with col1:
            if selected_entities:
                for entity in selected_entities:
                    st.markdown(f"<div style='background-color: #2563eb; color: white; font-size: 9px; "
                                f"font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; "
                                f"padding: 6px 12px; border-radius: 20px; display: inline-block; "
                                f"margin-right: 8px; margin-bottom: 8px;'>Entity: {entity}</div>", 
                                unsafe_allow_html=True)
            if selected_rdps:
                for rdp in selected_rdps:
                    st.markdown(f"<div style='background-color: #0f172a; color: white; font-size: 9px; "
                                f"font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; "
                                f"padding: 6px 12px; border-radius: 20px; display: inline-block; "
                                f"margin-right: 8px; margin-bottom: 8px;'>Node: {rdp}</div>", 
                                unsafe_allow_html=True)
    
    # Stats Overview
    st.subheader("📊 Overview")
    
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        total_ok = df['current'].apply(lambda x: x['ok']).sum()
        st.metric("Total OK", f"{total_ok:,}")
    
    with col2:
        total_packs = len(df)
        st.metric("Active Packs", total_packs)
    
    with col3:
        unique_rdps = df['rdpServer'].nunique()
        st.metric("RDP Servers", unique_rdps)
    
    with col4:
        total_current = df['current'].apply(lambda x: x['total']).sum()
        total_previous = df['previous'].apply(lambda x: x['total']).sum()
        success_rate = (total_ok / total_current * 100) if total_current > 0 else 0
        st.metric("Success Rate", f"{success_rate:.1f}%")
    
    st.divider()
    
    # RDP Server Cards
    st.subheader("🖥️ RDP Server Performance")
    
    # Calculate RDP stats
    rdp_stats = []
    for rdp in df['rdpServer'].unique():
        rdp_df = df[df['rdpServer'] == rdp]
        current_ok = rdp_df['current'].apply(lambda x: x['ok']).sum()
        previous_ok = rdp_df['previous'].apply(lambda x: x['ok']).sum()
        change = current_ok - previous_ok
        
        rdp_stats.append({
            'ip': rdp,
            'currentOk': current_ok,
            'previousOk': previous_ok,
            'change': change,
            'packCount': len(rdp_df),
            'entityCount': rdp_df['entity'].nunique()
        })
    
    # Sort by current OK descending
    rdp_stats = sorted(rdp_stats, key=lambda x: x['currentOk'], reverse=True)
    
    # Display as cards
    cols = st.columns(3)
    for i, stat in enumerate(rdp_stats):
        with cols[i % 3]:
            with st.container(border=True):
                st.markdown(f"**{stat['ip']}**")
                
                col_a, col_b = st.columns(2)
                with col_a:
                    st.metric("Current OK", stat['currentOk'], delta=f"{stat['change']:+d}")
                with col_b:
                    st.metric("Packs", stat['packCount'])
                
                st.caption(f"{stat['entityCount']} entities")
    
    st.divider()
    
    # Pack Status Table
    st.subheader("📋 Pack Details")
    
    # Prepare table data
    table_data = []
    for _, row in df.iterrows():
        change = row['current']['ok'] - row['previous']['ok']
        table_data.append({
            'Pack': row['name'],
            'Entity': row['entity'],
            'RDP Server': row['rdpServer'],
            'Platform': row['platform'],
            'Disk': row['disk'],
            'Previous OK': row['previous']['ok'],
            'Current OK': row['current']['ok'],
            'Change': change,
            'Previous Not OK': row['previous']['notOk'],
            'Current Not OK': row['current']['notOk']
        })
    
    table_df = pd.DataFrame(table_data)
    
    # Display table
    st.dataframe(
        table_df,
        use_container_width=True,
        hide_index=True,
        column_config={
            "Pack": st.column_config.TextColumn("Pack"),
            "Entity": st.column_config.TextColumn("Entity"),
            "RDP Server": st.column_config.TextColumn("RDP Server"),
            "Platform": st.column_config.TextColumn("Platform"),
            "Disk": st.column_config.TextColumn("Disk"),
            "Previous OK": st.column_config.NumberColumn("Prev OK"),
            "Current OK": st.column_config.NumberColumn("Curr OK"),
            "Change": st.column_config.NumberColumn(
                "Change",
                format="%+d",
                help="Change in OK count"
            ),
            "Previous Not OK": st.column_config.NumberColumn("Prev Not OK"),
            "Current Not OK": st.column_config.NumberColumn("Curr Not OK")
        }
    )
    
    # Footer
    st.divider()
    st.markdown("""
    <div style='text-align: center; padding: 24px;'>
        <div style='background-color: #f8fafc; padding: 12px; border-radius: 16px; 
                    display: inline-block; margin-bottom: 16px;'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" 
                 viewBox="0 0 24 24" stroke="currentColor" style='color: #cbd5e1;'>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.67.335a2 2 0 01-1.32.184l-2.59-.518a2 2 0 00-1.022.547l-1.013 1.014a2 2 0 00-.547 1.022l.518 2.59a2 2 0 00.184 1.32l.335.67a6 6 0 00.517 3.86l.477 2.387a2 2 0 00.547 1.022l1.014 1.013a2 2 0 00 1.022.547l2.59.518a2 2 0 00 1.32-.184l.67-.335a6 6 0 00 3.86-.517l2.387.477a2 2 0 00 1.022-.547l1.013-1.014a2 2 0 00.547-1.022l-.518-2.59a2 2 0 00-.184-1.32l-.335-.67a6 6 0 00-.517-3.86l-.477-2.387a2 2 0 00-.547-1.022l-1.014-1.013z"/>
            </svg>
        </div>
        <p style='font-size: 10px; font-weight: 900; color: #cbd5e1; text-transform: uppercase; 
                  letter-spacing: 0.4em;'>Proprietary Infrastructure Dashboard • Mission Critical Environment</p>
    </div>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()
