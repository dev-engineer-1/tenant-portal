# NestIQ

**Automate Property Management with AI**

NestIQ is a B2B SaaS platform designed to empower real estate property managers by automating tenant communication, maintenance requests, and rent collection. By leveraging AI, NestIQ enables property managers to efficiently manage 3x more properties with the same team, freeing up valuable time and resources.

## Problem Solved

Property management involves numerous repetitive tasks that can overwhelm teams, especially as portfolios grow. NestIQ addresses this challenge by automating key operations, allowing property managers to focus on strategic growth and tenant satisfaction.

## Key Features

- **AI-Powered Tenant Communication**: Automate responses to common tenant inquiries and streamline communication.
- **Maintenance Request Automation**: Efficiently handle maintenance requests with a seamless, AI-driven workflow.
- **Automated Rent Collection**: Simplify rent collection processes with integrated payment solutions.
- **Portfolio Management**: Easily connect and manage multiple properties from a single platform.

## Tech Stack

- **Backend**: Python, FastAPI
- **Frontend**: React
- **Database**: PostgreSQL
- **Payment Processing**: Stripe
- **AI Services**: OpenAI API

## Getting Started

To get started with NestIQ, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/nestiq.git
   cd nestiq
   ```

2. **Set Up the Environment**
   - Ensure you have Python 3.8+ installed.
   - Create a virtual environment and activate it:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**
   - Create a `.env` file in the root directory and add your configuration:
     ```
     STRIPE_API_KEY=your_stripe_api_key
     DATABASE_URL=your_database_url
     ```

5. **Run the Application**
   ```bash
   uvicorn src.main:app --reload
   ```

6. **Access the Application**
   - Open your browser and navigate to `http://localhost:8000` to access the NestIQ platform.

## Built with Agentix

NestIQ is proudly built with [Agentix](https://agentix.com), leveraging cutting-edge technology to redefine property management.