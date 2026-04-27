# NestIQ: Automate Your Property Management

NestIQ is a B2B SaaS platform designed to empower real estate property managers by automating tenant communication, maintenance requests, and rent collection. With NestIQ, property managers can efficiently manage three times more properties with the same team, freeing up valuable time and resources.

## Problem Solved

Property management involves repetitive and time-consuming tasks that can overwhelm property managers, especially as their portfolios grow. NestIQ addresses this by automating key operations, allowing managers to focus on strategic growth and tenant satisfaction.

## Key Features

- **Automated Tenant Communication**: Streamline interactions with tenants through AI-driven messaging.
- **Maintenance Request Management**: Simplify the process of handling and tracking maintenance requests.
- **Rent Collection Automation**: Integrate with Stripe for seamless rent payment processing.
- **Portfolio Integration**: Easily connect and manage your entire property portfolio.
- **Scalability**: Manage up to 3x more properties without increasing your team size.

## Tech Stack

- **Backend**: Python, FastAPI
- **Payments**: Stripe API
- **Authentication**: OAuth2
- **Database**: PostgreSQL
- **Hosting**: AWS

## Getting Started

To get started with NestIQ, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/nestiq.git
   cd nestiq
   ```

2. **Install Dependencies**:
   Ensure you have Python 3.8+ installed. Then, install the required packages:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and configure your environment variables:
   ```plaintext
   STRIPE_API_KEY=your_stripe_api_key
   DATABASE_URL=your_database_url
   ```

4. **Run the Application**:
   Start the FastAPI server:
   ```bash
   uvicorn src.main:app --reload
   ```

5. **Access the API Documentation**:
   Visit `http://localhost:8000/docs` to explore the API endpoints.

## Built with Agentix

NestIQ is proudly built with [Agentix](https://agentix.com), ensuring robust and scalable solutions for property management automation.
```