import streamlit as st
import streamlit.components.v1 as components
import os

# 1. Configure Streamlit Page
st.set_page_config(
    page_title="RDP Status Pro Monitor",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# 2. Hide Streamlit's default UI elements for a clean dashboard look
st.markdown("""
    <style>
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    .block-container {padding: 0;}
    iframe {border: none;}
    </style>
""", unsafe_allow_html=True)

# 3. Serve the React Dashboard
def load_app():
    try:
        path = os.path.dirname(__file__)
        file_path = os.path.join(path, "index.html")
        with open(file_path, "r", encoding="utf-8") as f:
            html_content = f.read()
        
        # Inject the React dashboard into the Streamlit app
        components.html(html_content, height=2500, scrolling=True)
    except Exception as e:
        st.error(f"Error loading dashboard: {e}")

if __name__ == "__main__":
    load_app()
