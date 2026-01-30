
import streamlit as st
import streamlit.components.v1 as components
import os

# 1. Configure Streamlit Page
st.set_page_config(
    page_title="RDP Status Monitor",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# 2. Hide Streamlit's default UI elements for a clean dashboard look
hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
            .block-container {padding: 0;}
            iframe {border: none;}
            </style>
            """
st.markdown(hide_st_style, unsafe_allow_html=True)

# 3. Load and serve the local index.html
# We read the file content to inject it directly into the component
def load_app():
    try:
        with open("index.html", "r", encoding="utf-8") as f:
            html_content = f.read()
        
        # Inject the React dashboard into the Streamlit app
        # We use a large height to ensure the dashboard is fully visible without double scrollbars
        components.html(html_content, height=2000, scrolling=True)
    except FileNotFoundError:
        st.error("Error: index.html not found. Please ensure all files are uploaded to your GitHub repository.")

if __name__ == "__main__":
    load_app()
