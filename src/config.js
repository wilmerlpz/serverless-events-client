const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "events-app-api-dev-attachmentsbucket-1n3xf1x7ykcjq"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://7aegaatm8l.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_MFnELNdbN",
    APP_CLIENT_ID: "rnlb1mkbmte7jd0g2ve947d80",
    IDENTITY_POOL_ID: "us-east-1:df444f30-f81d-4c57-8918-322b33786bd9"
  }
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "events-app-uploads"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://e6mkuvw4v0.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_PoQDMAnY2",
    APP_CLIENT_ID: "1k2gmnn4ko83h3th3hk5nmu7sc",
    IDENTITY_POOL_ID: "us-east-1:ca91f352-f6ab-4dc1-be61-61761f3f20b7"
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