const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "events-app-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://vy5ko5j9yd.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_21E1fcm1I",
    APP_CLIENT_ID: "7qhbd9v3efafsp70ntnvmof5ia",
    IDENTITY_POOL_ID: "us-east-1:64c573e8-6026-4fac-8d03-1593c7712278"
  }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "events-app-uploads-prod"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://vy5ko5j9yd.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_21E1fcm1I",
    APP_CLIENT_ID: "7qhbd9v3efafsp70ntnvmof5ia",
    IDENTITY_POOL_ID: "us-east-1:64c573e8-6026-4fac-8d03-1593c7712278"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};