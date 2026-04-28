# NestIQ

**Automate Property Management with AI**

NestIQ is a B2B SaaS platform designed to empower real estate property managers by automating tenant communication, maintenance requests, and rent collection. By connecting their portfolio to NestIQ, property managers can efficiently manage up to three times more properties with the same team.

## Problem Solved

Property managers often grapple with repetitive and time-consuming tasks that hinder their ability to scale operations. NestIQ leverages AI to streamline these processes, allowing property managers to focus on growth and tenant satisfaction.

## Key Features

- **AI-Powered Tenant Communication**: Automate responses to common tenant inquiries, reducing response time and improving tenant satisfaction.
- **Seamless Maintenance Request Management**: Efficiently handle maintenance requests with automated routing and tracking.
- **Automated Rent Collection**: Simplify rent collection with integrated payment processing and reminders.
- **Portfolio Integration**: Easily connect and manage multiple properties from a single dashboard.
- **Scalable Operations**: Enable property managers to handle more properties without increasing headcount.

## Tech Stack

- **Backend**: Python, FastAPI
- **Payments**: Stripe
- **AI**: Natural Language Processing (NLP) for tenant communication
- **Database**: PostgreSQL
- **Hosting**: AWS

## Getting Started

To set up the NestIQ backend locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/nestiq/nestiq-backend.git
   cd nestiq-backend
   ```

2. **Set Up a Virtual Environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**:
   Create a `.env` file in the project root and add your configuration:
   ```plaintext
   STRIPE_API_KEY=your_stripe_api_key
   DATABASE_URL=your_database_url
   ```

5. **Run the Application**:
   ```bash
   uvicorn src.main:app --reload
   ```

6. **Access the API**:
   Visit `http://localhost:8000/docs` to explore the API documentation.

## Built with Agentix

NestIQ is proudly built with [Agentix](https://agentix.io), leveraging cutting-edge technology to deliver innovative solutions for property management.