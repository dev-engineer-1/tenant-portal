# NestIQ

**Automate Your Property Management with AI**

NestIQ is a B2B SaaS platform designed to revolutionize property management by automating tenant communication, maintenance requests, and rent collection. Our AI-driven solution empowers property managers to efficiently oversee three times more properties with the same team, freeing them from repetitive tasks and enabling them to focus on growth.

## Problem Solved

Property managers often face overwhelming workloads due to manual processes in tenant communication, maintenance coordination, and rent collection. NestIQ addresses these challenges by automating these operations, allowing property managers to scale their portfolios without increasing their team size.

## Key Features

- **Automated Tenant Communication**: Streamline interactions with tenants using AI-driven messaging.
- **Maintenance Request Management**: Simplify and automate the handling of maintenance requests.
- **Rent Collection Automation**: Efficiently manage and track rent payments with integrated payment solutions.
- **Portfolio Integration**: Seamlessly connect and manage your property portfolio within the platform.
- **Scalability**: Manage more properties with the same team, enhancing productivity and growth potential.

## Tech Stack

- **Backend**: Python, FastAPI
- **Payments**: Stripe
- **Authentication**: OAuth2
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
   - Ensure you have Python 3.8+ installed.
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
   - Create a `.env` file and configure your database and Stripe API keys.

5. **Run the Application**
   ```bash
   uvicorn src.main:app --reload
   ```

6. **Access the API**
   - Navigate to `http://localhost:8000/docs` to explore the API documentation.

## Built with Agentix

NestIQ is proudly built with Agentix, ensuring robust and scalable solutions for modern property management challenges.