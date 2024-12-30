import { z } from 'zod';

enum InstanceType {
  T2_MICRO = 't2.micro',
  T2_SMALL = 't2.small',
  T2_MEDIUM = 't2.medium',
  T2_LARGE = 't2.large',
}

export const createEC2InstanceSchema = z.object({
  instanceType: z.nativeEnum(InstanceType, { required_error: 'Instance type is required' }),
  amiId: z.string({ required_error: 'AMI ID is required' }),
  tags: z.array(z.record(z.string()), { required_error: 'Tags are required' }),
  numberOfInstance: z.number({ required_error: 'Number of instances is required' }).lte(3, `Number of instances should be less than or equal to 3`),
});

export type EC2Instance = z.infer<typeof createEC2InstanceSchema>;
