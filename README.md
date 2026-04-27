# NestIQ

**Automate Property Management with AI**

NestIQ is a B2B SaaS platform designed to streamline and automate the repetitive tasks of real estate property management. By leveraging AI, NestIQ enables property managers to efficiently handle tenant communication, maintenance requests, and rent collection, allowing them to manage three times more properties with the same team.

## Problem Solved

Property managers often face the challenge of managing numerous properties while dealing with repetitive and time-consuming tasks. NestIQ addresses this by automating key operations, freeing up time and resources, and enhancing overall productivity.

## Key Features

- **Automated Tenant Communication**: Seamlessly manage tenant inquiries and notifications with AI-driven responses.
- **Maintenance Request Management**: Efficiently handle and track maintenance requests through a streamlined process.
- **Rent Collection Automation**: Simplify rent collection with automated payment processing and reminders.
- **Portfolio Integration**: Easily connect and manage your property portfolio within the platform.
- **Scalable Management**: Empower your team to manage more properties without increasing headcount.

## Tech Stack

- **Backend**: Python, FastAPI
- **Payments**: Stripe
- **Database**: PostgreSQL
- **AI**: OpenAI GPT
- **Hosting**: AWS

## Getting Started

To get started with NestIQ, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/nestiq.git
   cd nestiq
   ```

2. **Set Up the Environment**:
   - Ensure you have Python 3.8+ installed.
   - Create a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**:
   - Create a `.env` file and add your configuration settings (e.g., database URL, Stripe API keys).

5. **Run the Application**:
   ```bash
   uvicorn src.main:app --reload
   ```

6. **Access the API**:
   - Open your browser and navigate to `http://localhost:8000/docs` to explore the API documentation.

## Built with Agentix

NestIQ is proudly built with [Agentix](https://agentix.ai), empowering us to deliver cutting-edge AI solutions for property management.