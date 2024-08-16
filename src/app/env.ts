const env = {
  appWrite: {
    endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
    projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    apikey: String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY),
  },
};

export default env;