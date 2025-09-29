const AWS = require('aws-sdk');

// 🔧 Altere a região conforme a localização da sua instância EC2
AWS.config.update({ region: 'us-east-1' });

// Cria objeto EC2 com a API específica
const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });

const params = {
    InstanceIds: ['i-07ffe8c0ef76da8eb'], // Substitua pelo(s) seu(s) InstanceId(s)
};

// Função para iniciar EC2
exports.startEC2Instance = function(event, context, callback) {

    ec2.startInstances(params, function(err, data) {
        if (err) {
            console.log("Erro ao ligar EC2:", err.stack);
            callback(err);
        } else {
            console.log("Porteiro ligado com sucesso:", data.StartingInstances);
            callback(null, data);
        }
    });
};

// Função para parar EC2
exports.stopEC2Instance = function(event, context, callback) {

    ec2.stopInstances(params, function(err, data) {
        if (err) {
            console.log("Erro ao desligar EC2:", err.stack);
            callback(err);
        } else {
            console.log("Porteiro desligado com sucesso:", data.StoppingInstances);
            callback(null, data);
        }
    });
};
