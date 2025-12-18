<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found - Indentio</title>
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
            color: #3498db;
            line-height: 1;
            margin-bottom: 20px;
            text-shadow: 0 4px 20px rgba(52, 152, 219, 0.3);
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
        <div class="error-code">404</div>
        <h1 class="error-title">Page Not Found</h1>
        <p class="error-message">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
        </p>
        <a href="{{ url('/') }}" class="btn">Go to Homepage</a>
        <div class="links">
            <a href="{{ url('/dashboard') }}">Dashboard</a>
            <a href="{{ url('/resumes') }}">My Resumes</a>
        </div>
    </div>
</body>
</html>
