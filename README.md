# NestIQ

**Automate Your Property Management with AI**

NestIQ is a B2B SaaS platform designed to streamline the operations of real estate property managers. By leveraging AI, NestIQ automates tenant communication, maintenance requests, and rent collection, enabling property managers to efficiently manage three times more properties with the same team.

## Problem Solved

Property managers often face the challenge of handling repetitive and time-consuming tasks. NestIQ addresses this by automating these operations, freeing up managers to focus on growth and tenant satisfaction.

## Key Features

- **Automated Tenant Communication**: AI-driven responses and notifications to keep tenants informed and engaged.
- **Maintenance Request Management**: Streamlined process for submitting, tracking, and resolving maintenance issues.
- **Rent Collection Automation**: Seamless integration with payment systems to automate rent collection and reminders.
- **Portfolio Integration**: Easy connection of property portfolios for centralized management.
- **Scalable Operations**: Manage more properties without increasing team size.

## Tech Stack

- **Backend**: Python, FastAPI
- **Payments**: Stripe
- **AI**: Natural Language Processing (NLP) for tenant communication
- **Database**: PostgreSQL
- **Hosting**: AWS

## Getting Started

To get started with NestIQ, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/nestiq.git
   cd nestiq
   ```

2. **Set Up the Environment**
   - Install Python 3.8 or later.
   - Create a virtual environment:
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

6. **Access the API**
   - Open your browser and navigate to `http://localhost:8000/docs` to explore the API documentation.

## Built with Agentix

NestIQ is proudly built with [Agentix](https://agentix.com), empowering innovative solutions in property management.