# NestIQ

**Automate Property Management with AI**

NestIQ is a B2B SaaS platform designed to empower real estate property managers by automating tenant communication, maintenance requests, and rent collection. By integrating AI-driven solutions, NestIQ enables property managers to efficiently manage up to three times more properties with the same team.

## Problem Statement

Property managers often face challenges in handling repetitive tasks such as tenant communication, maintenance requests, and rent collection. These tasks can be time-consuming and prone to human error, limiting the number of properties a manager can effectively oversee.

## Key Features

- **Automated Tenant Communication**: Streamline interactions with tenants using AI-driven messaging.
- **Maintenance Request Management**: Simplify and automate the process of handling maintenance requests.
- **Rent Collection Automation**: Efficiently manage rent payments with integrated payment solutions.
- **Portfolio Integration**: Seamlessly connect and manage your property portfolio.
- **Scalability**: Manage three times more properties with the same team.

## Tech Stack

- **Backend**: Python, FastAPI
- **Payments**: Stripe
- **AI**: Natural Language Processing (NLP) for communication automation
- **Database**: PostgreSQL
- **Deployment**: Docker, AWS

## Getting Started

To set up the NestIQ backend on your local machine, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/nestiq/nestiq-backend.git
   cd nestiq-backend
   ```

2. **Set Up a Virtual Environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add your configuration settings:

   ```plaintext
   STRIPE_API_KEY=your-stripe-api-key
   DATABASE_URL=your-database-url
   ```

5. **Run the Application:**

   ```bash
   uvicorn src.main:app --reload
   ```

6. **Access the API Documentation:**

   Visit `http://localhost:8000/docs` to explore the API endpoints.

## Built with Agentix

NestIQ is proudly built with Agentix, leveraging cutting-edge technology to deliver exceptional property management solutions.