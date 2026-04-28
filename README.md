# NestIQ: Automate Your Property Management

NestIQ is a B2B SaaS platform designed to empower real estate property managers by automating tenant communication, maintenance requests, and rent collection. By leveraging AI, NestIQ allows property managers to efficiently manage up to three times more properties with the same team.

## Problem Solved

Property managers often face overwhelming workloads due to repetitive tasks such as handling tenant inquiries, processing maintenance requests, and managing rent collection. NestIQ streamlines these operations, enabling property managers to focus on growth and tenant satisfaction.

## Key Features

- **Automated Tenant Communication**: AI-driven responses to common tenant inquiries.
- **Maintenance Request Management**: Simplified tracking and resolution of maintenance issues.
- **Rent Collection Automation**: Seamless integration with Stripe for hassle-free rent payments.
- **Portfolio Integration**: Connect and manage your entire property portfolio from a single platform.
- **Scalable Management**: Manage up to 3x more properties without increasing team size.

## Tech Stack

- **Backend**: Python, FastAPI
- **Payments**: Stripe
- **AI**: OpenAI GPT
- **Database**: PostgreSQL
- **Hosting**: AWS

## Getting Started

To get started with NestIQ's tenant portal backend, follow these steps:

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
   - Create a `.env` file in the root directory and add your configuration details:
     ```
     STRIPE_API_KEY=your_stripe_api_key
     DATABASE_URL=your_database_url
     ```

5. **Run the Application**
   ```bash
   uvicorn src.main:app --reload
   ```

6. **Access the API**
   - The API will be available at `http://localhost:8000`.

## Built with Agentix

NestIQ is proudly built with [Agentix](https://agentix.com), ensuring a robust and scalable platform for all your property management needs.