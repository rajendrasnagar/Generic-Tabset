# Get the private key from the environment variable
echo "Setting up Production Connection..."
mkdir keys
echo $SFDC_SERVER_KEY | base64 -d > keys/server.key

# Authenticate to salesforce
echo "Authenticating..."
sfdx force:auth:jwt:grant --clientid '3MVG9pe2TCoA1Pf5A3gfcG6XYI3xg93lDMW4N8HE6CF7SUPaJKHB2Pd4_IQp2zO8D9eeLMpBu3E3nX6yPwQL1' --jwtkeyfile keys/server.key --username 'rajendra.nagar@tools.com' --setdefaultdevhubusername -a DevHub