# NestIQ: Automate Property Management with AI

NestIQ is a B2B SaaS platform designed to help real estate property managers automate tenant communication, maintenance requests, and rent collection. By connecting their portfolio to NestIQ, property managers can manage 3x more properties with the same team.

## Problem Solved

Managing multiple properties involves repetitive tasks that consume time and resources. NestIQ streamlines these operations, allowing property managers to focus on growth and tenant satisfaction.

## Key Features

- **Automated Tenant Communication**: Leverage AI to handle tenant inquiries and updates efficiently.
- **Streamlined Maintenance Requests**: Simplify the process of logging and tracking maintenance issues.
- **Efficient Rent Collection**: Automate rent payment processing and reminders.
- **Portfolio Management**: Centralize property data for easy access and management.
- **Scalable Operations**: Manage more properties without increasing team size.

## Tech Stack

- **Backend**: Python, FastAPI
- **Frontend**: React
- **Database**: PostgreSQL
- **Payments**: Stripe
- **Authentication**: OAuth2
- **Hosting**: AWS

## Getting Started

Follow these steps to set up the NestIQ backend locally:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/nestiq.git
   cd nestiq
   ```

2. **Set Up the Environment**

   Ensure you have Python 3.8+ installed. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the root directory and add your configuration:

   ```plaintext
   STRIPE_API_KEY=your_stripe_api_key
   DATABASE_URL=your_database_url
   ```

5. **Run the Application**

   Start the FastAPI server:

   ```bash
   uvicorn src.main:app --reload
   ```

6. **Access the API**

   Open your browser and navigate to `http://localhost:8000/docs` to explore the API documentation.

## Built with Agentix

NestIQ is proudly built with [Agentix](https://agentix.io), leveraging cutting-edge AI technology to transform property management.

---
```