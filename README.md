# NestIQ

**Automate Your Property Management**

NestIQ is a B2B SaaS platform designed to streamline the operations of real estate property managers by leveraging AI to automate tenant communication, maintenance requests, and rent collection. With NestIQ, property managers can efficiently manage three times more properties with the same team.

## Problem Solved

Property managers often face overwhelming workloads with repetitive tasks that consume valuable time and resources. NestIQ addresses these challenges by automating routine operations, allowing property managers to focus on strategic growth and tenant satisfaction.

## Key Features

- **AI-Powered Tenant Communication**: Automate responses to common tenant inquiries and streamline communication.
- **Maintenance Request Automation**: Efficiently manage and track maintenance requests with automated workflows.
- **Seamless Rent Collection**: Simplify rent payments with integrated payment processing.
- **Portfolio Integration**: Easily connect and manage your entire property portfolio within a single platform.
- **Scalable Management**: Increase the number of properties managed without increasing team size.

## Tech Stack

- **Backend**: Python, FastAPI
- **AI**: TensorFlow, OpenAI GPT
- **Database**: PostgreSQL
- **Payments**: Stripe
- **Hosting**: AWS

## Getting Started

To get started with NestIQ's Tenant Portal backend, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/nestiq.git
   cd nestiq
   ```

2. **Set Up Environment**:
   - Ensure Python 3.8+ is installed.
   - Create a virtual environment and activate it:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Application**:
   - Start the FastAPI server:
     ```bash
     uvicorn src.main:app --reload
     ```

5. **Access the API Documentation**:
   - Visit `http://127.0.0.1:8000/docs` to explore the API endpoints.

## Built with Agentix

NestIQ is proudly built with [Agentix](https://agentix.ai), empowering innovative solutions in the real estate industry.