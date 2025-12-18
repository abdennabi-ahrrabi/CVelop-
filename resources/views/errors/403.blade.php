<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access Denied - CV Builder</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #1a2332 0%, #2c3e50 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
        }
        .container {
            text-align: center;
            padding: 40px;
            max-width: 600px;
        }
        .error-code {
            font-size: 120px;
            font-weight: 700;
            color: #f39c12;
            line-height: 1;
            margin-bottom: 20px;
            text-shadow: 0 4px 20px rgba(243, 156, 18, 0.3);
        }
        .error-title {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 16px;
            color: #ecf0f1;
        }
        .error-message {
            font-size: 16px;
            color: #bdc3c7;
            margin-bottom: 32px;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            padding: 14px 32px;
            background: #3498db;
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
        }
        .btn:hover {
            background: #2980b9;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(52, 152, 219, 0.5);
        }
        .links {
            margin-top: 24px;
        }
        .links a {
            color: #3498db;
            text-decoration: none;
            margin: 0 12px;
            font-size: 14px;
        }
        .links a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="error-code">403</div>
        <h1 class="error-title">Access Denied</h1>
        <p class="error-message">
            You don't have permission to access this resource.
            Please make sure you're logged in with the correct account.
        </p>
        <a href="{{ url('/dashboard') }}" class="btn">Go to Dashboard</a>
        <div class="links">
            <a href="{{ url('/') }}">Homepage</a>
            <a href="{{ url('/login') }}">Login</a>
        </div>
    </div>
</body>
</html>
