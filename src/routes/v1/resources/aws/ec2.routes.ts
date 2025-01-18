import express from 'express';

import EC2Controller from '../../../../controllers/resources/aws/ec2.controller';
import { validateRequestBody, validateRequestParams } from '../../../../middleware/validation.middleware';
import { createEC2InstanceSchema, deleteEC2InstanceSchema, deleteResource } from '../../../../schemas/resources/aws/ec2.schema';

const ec2Router = express.Router();

ec2Router.post('/create-instance', validateRequestBody(createEC2InstanceSchema), EC2Controller.createEC2Instance);
ec2Router.delete('/delete-specific-instance/:instanceId', validateRequestParams(deleteEC2InstanceSchema), EC2Controller.deleteSpecificEC2Instance);
ec2Router.delete('/delete-resource/:resourceId', validateRequestParams(deleteResource), EC2Controller.deleteEC2InstanceWithSameResourceId);
ec2Router.get('/ip-address/:resourceId', validateRequestParams(deleteResource), EC2Controller.getEC2IpAddress);

export default ec2Router;
