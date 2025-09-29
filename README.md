# porteiro


Este projeto permite **ligar e desligar automaticamente uma instância EC2** utilizando **AWS Lambda**, **EventBridge (CloudWatch Events)** e **AWS SAM**.

---

## 📌 Funcionalidades
- Ligar uma instância EC2 em um horário definido.
- Desligar a instância EC2 em um horário definido.
- Configuração de agendamentos usando **CRON**.
- Código em **Node.js** com handlers para start/stop.
- Implantação simplificada via **AWS SAM**.

---


---

## ⚙️ Pré-requisitos
- **Conta AWS** configurada.
- **AWS CLI** instalada e autenticada.
- **AWS SAM CLI** instalado.
- Node.js 18+ (usamos runtime Node.js 22.x no Lambda).
- Uma chave PEM válida para acesso à instância EC2 (se precisar abrir túnel).

---

## 🚀 Deploy do Projeto

1. **Build da aplicação**:
   ```bash
   sam build
Deploy com guided mode (primeira vez):

bash
Copy code
sam deploy --guided
Informe o nome da stack (ex: porteiro).

Confirme a região AWS (us-east-1 por padrão).

Aceite a criação de roles IAM.

Deploy subsequente:

bash
Copy code
sam deploy
🔧 Configurações no template.yaml
Agendamento das Funções
A função LigarPorteiro está configurada para rodar às 23:43 de segunda a sábado:

yaml
Copy code
Schedule: cron(43 23 ? * MON-SAT *)
A função DesligarPorteiro está configurada para rodar às 23:59 de segunda a sábado:

yaml
Copy code
Schedule: cron(59 23 ? * MON-SAT *)
⚠️ Ajuste os horários conforme sua necessidade.
Consulte a documentação oficial de CRON.

Permissões IAM
Atualmente as permissões estão liberadas para "Resource": "*".
👉 Recomenda-se restringir para o ARN da sua instância:

yaml
Copy code
Resource: arn:aws:ec2:us-east-1:<ID_CONTA>:instance/<ID_INSTANCIA>
🔑 Variáveis de Ambiente
Para evitar hardcode no código, configure o INSTANCE_ID como variável de ambiente no template.yaml:

yaml
Copy code
Environment:
  Variables:
    INSTANCE_ID: i-xxxxxxxxxxxxxxxxx
E no código (porteiro.js) use:

js
Copy code
const INSTANCE_ID = process.env.INSTANCE_ID;
🐧 Script de Conexão SSH (opcional)
Caso queira abrir um túnel SSH para acessar o banco RDS via instância EC2 (porteiro):

bash
Copy code
INSTANCE_ID_PORTEIRO=i-xxxxxxxxxxxx
PEM_PATH="~/acesso_instancia.pem"
SERVIDOR_RDS=seu-banco.c0to22kc6yqy.us-east-1.rds.amazonaws.com
PORTA_LOCAL=5438

IP_PORTEIRO=$(aws ec2 describe-instances --instance-ids $INSTANCE_ID_PORTEIRO \
  --query 'Reservations[].Instances[].PublicIpAddress' \
  --output text)

ssh -f -N -i $PEM_PATH ec2-user@$IP_PORTEIRO -L $PORTA_LOCAL:$SERVIDOR_RDS:5432

echo "✅ Conectado! Acesse o banco em localhost:$PORTA_LOCAL"
📖 Referências
AWS SAM Documentation

EC2 Start/Stop Instances

EventBridge Scheduled Events

👨‍💻 Autor