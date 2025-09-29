# ⚠️ Altere o ID da instância EC2 do porteiro
INSTANCE_ID_PORTEIRO=i-07ffe8c0ef76da8eb

# 🔧 Obtém o IP público da instância automaticamente
# ➝ Ajuste o profile da AWS CLI conforme sua configuração (~/.aws/credentials)
IP_PORTEIRO=$(aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID_PORTEIRO \
  --query 'Reservations[].Instances[].PublicIpAddress' \
  --profile bia-serveless \
  --output json | grep -vE '\[|\]' | awk -F'"' '{print $2}')

echo "IP público do porteiro: $IP_PORTEIRO"

# 🔐 Caminho do arquivo PEM para autenticação SSH
# ➝ Troque pelo caminho do seu arquivo .pem
PEM_PATH="/home/vitor/formacaoaws/acesso_instancia_linux.pem"

# 🗄️ Endereço do banco de dados RDS
# ➝ Substitua pelo endpoint do seu RDS
SERVIDOR_RDS_1=postgresql.c0to22kc6yqy.us-east-1.rds.amazonaws.com

# 🔧 Porta local que será usada no túnel
# ➝ Altere se precisar rodar múltiplos túneis para diferentes bancos
PORTA_LOCAL_RDS_1=5438

# 🚀 Cria o túnel SSH
# -f → roda em background
# -N → não executa comandos, só mantém túnel
# -i → chave PEM para acesso
# -L → redirecionamento de porta local → servidor RDS
ssh -f -N -i $PEM_PATH ec2-user@$IP_PORTEIRO -L $PORTA_LOCAL_RDS_1:$SERVIDOR_RDS_1:5432 

echo "✅ Porteiro conectado! Acesse o banco de dados em localhost:$PORTA_LOCAL_RDS_1"