import dotenv
import os

dotenv.load_dotenv()

def get_cred_json():
    service = {
            "type": "service_account",
            "project_id": "notional-analog-425317-u5",
            "private_key_id": os.getenv("GOOGLE_PRIVATE_KEY_ID"),
            # "private_key": r"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3iObQWpBMcBoF\nL/deiw9MrAh34lflFaq+yxz5PRwxHpfeaeSTBLoFOJv60BzGylRwQoBeicWdFG/5\nKcW+thmzfy2jE3ycck3bUTAvalpZ6nErcO9G94HVkt3AyQ0qXY7QOmgQRJOk6kZ3\n8vX2YC1oTRQo2LHNJp1AV9W2hIthN5eu0z+MWwzH0c52VbA2S+B8NWd1CBVA4SpY\naez9ZAZAr7mK1KwfYWU6Ajj2Q6qjKsI2NNvftRfTbT7QcdC8Jsr5zmKOhKnUXmcr\nUM9k6yW9Cpv8Go5zYxMec928U2r2l0rlp0Lb3rUZsEiVZ49jXzny/cUKkVWesd/K\nPpHbf8arAgMBAAECggEARTiDgTKe+M1Q6wLvw78j2pGJshlyeArHdqUpfNExCE+X\nDMIYfOCL/jsfDSYfrFQUK7DRNJa2qutR3gIEvEx2/g1p23cWiPTNa3m/+CofAImc\n/Drga/4egDwfmb3aUs+tdNiKdhQ/MTRQtp2yaaVViuCDSXKNAKhfJ6zZBDkSTmwj\nDlE/BzLLfPLoD1oNLUKl1ef5ASFKn7y2l6MjEHNk3XibPoawYDS0Pee4EA0u2hUT\nLZhmFfPqITQQWDcVjQUl+BP0QkfxUi3zWfb0pDMzoElvs5+ab9srklkqgsNhPzmt\nLyjyXn/WXJ99CTIRdRM012OMf+4AriW36w/WK9hVtQKBgQDhY8QXWlEsjjh4obId\nVVMKhRfN992HzqSHtKysSJxIz9UZcd26lgVrcNiNDMb64iQFRUrxtRhyVI6rcjQ7\n7FiUiCxVzFeo8DGamhMOUW0Sw9bjt2diXQPCzseG1mPh85c3Tctzjrdx/9t7vPHn\nyuNuaip3ixjEK7Q9qIBovdzjbwKBgQDQdfHOiQIob9hToIgUqNlcGpcn5FRfIRiq\nxs+dGwUnaQTqhZRccBJeazWXwng1R4IL1C65l++Bzye4wmIqLgghGyW7Geh8R1Cd\nB4k9h6NMkawmyaO+qm4hVN62XBWuGA/nLG8iE0qp9P99f5cIp7TrjrRDi4gePGkF\nAexhsxVChQKBgHzI+3viaSa95s4C19Yds0gTv8YtAN17ruPjR+ZqnPxC9LyNqjDv\ndjix1XLiLBgis8anQoLnvI0v+304UWsLw08YxVMLO00xDoWF4B8BPd4xxvt0QyzW\nSorEaPtiHxKuBn5797QWw8G94gpz5Yprbddnt/NPc3rIp5WrgMx8sZrJAoGBALZo\nHhh9Znf/tikm9Swuu1OOqOltMC61hSIaKRztwcrEaFrWXAWuw0P/R7vtnMXyNmcn\nWWNpAVhy7e0Lml4SPWbKnG9lsjrdJDrjl0FR6KBdb2fZVQDHnOppmx+y3/2gbHn6\nNZx5iQHCsbUc6gnWxcbA7heUhpz+e164WiD7VQUJAoGAeSaoZXtZHCOWKQcV681L\n2vbVK8Pd2yiHyGkRxbt8W9qEjFTCW1iYLWivLQEs602i9tYYRiIGQGI4kSb9+Bw4\nLAFYaUQP1QfT1cBOS8IoYD2Og3Aya+1OTk+VAytbw4L1S8EZGCPPS9trt8YCxPUA\nPDVJXZ2702MmJ9FnSNu5MEA=\n-----END PRIVATE KEY-----\n",
            "private_key": os.getenv("GOOGLE_PRIVATE_KEY").replace("\\n", "\n"),
            "client_email": os.getenv("GOOGLE_CLIENT_EMAIL"),
            "client_id": os.getenv("GOOGLE_CLIENT_ID"),
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": os.getenv("GOOGLE_CLIENT_X509_CERT_URL"),
            "universe_domain": "googleapis.com"
        }

    return service

