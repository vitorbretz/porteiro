const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });
const ec2 = new AWS.EC2({ apiVersion: '2016-11-15' });
const params = {
    InstanceIds: ['i-07ffe8c0ef76da8eb'],

};

exports.startEC2Instance = () => {
    return ec2.startInstances(params, function(err, data) {
        if (err) {
            console.log("Error", err.stack);
        } else {
            console.log("Porteiro ligado com Success", data.StartingInstances);
        }
    });
};


exports.stopEC2Instance = () => {
    return ec2.stopInstances(params, function(err, data) {
        if (err) {
            console.log("Error", err.stack);
        } else {
            console.log("Porteiro Desligado com Success", data.StartingInstances);
        }
    });
};