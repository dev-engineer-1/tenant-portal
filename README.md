# NestIQ: Automate Your Property Management

NestIQ is a B2B SaaS platform leveraging AI to streamline tenant communication, automate maintenance requests, and simplify rent collection for real estate property managers. Manage 3x more properties with the same team.

## Problem Solved

Property managers often face overwhelming workloads due to repetitive tasks such as tenant communication, handling maintenance requests, and managing rent collection. NestIQ automates these operations, allowing property managers to focus on scaling their portfolios efficiently.

## Key Features

- **AI-Powered Tenant Communication**: Automate responses to common tenant inquiries.
- **Maintenance Request Automation**: Streamline the process of receiving and managing maintenance requests.
- **Seamless Rent Collection**: Simplify rent payments with integrated payment solutions.
- **Portfolio Integration**: Easily connect and manage multiple properties from a single platform.
- **Scalable Management**: Handle more properties without increasing team size.

## Tech Stack

- **Backend**: Python, FastAPI
- **Frontend**: React
- **Database**: PostgreSQL
- **AI**: TensorFlow
- **Payments**: Stripe
- **Hosting**: AWS

## Getting Started

To get started with NestIQ, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nestiq/nestiq.git
   cd nestiq
   ```

2. **Set Up the Environment**
   - Ensure Python 3.8+ is installed.
   - Create a virtual environment:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```

3. **Configure Environment Variables**
   - Create a `.env` file based on `.env.example` and fill in necessary configurations such as database credentials and Stripe API keys.

4. **Run the Application**
   ```bash
   uvicorn src.main:app --reload
   ```

5. **Access the API**
   - The API will be available at `http://localhost:8000`.

## Built with Agentix

NestIQ is proudly built with Agentix, enabling rapid development and deployment of AI-driven solutions for property management.