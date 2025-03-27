#!/bin/bash

# Exit immediately if any command exits with a non-zero status
set -o errexit

# Ensure environment variables are accessible in the build process
export REACT_APP_RENDER_GIT_COMMIT=$RENDER_GIT_COMMIT

# Install dependencies
yarn install --frozen-lockfile  # Use npm install if you prefer

# Build the React App
yarn build  # Use npm run build if using npm

# Print success message
echo "✅ Build completed successfully!"
