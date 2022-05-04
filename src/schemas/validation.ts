import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';
import answerSchema from './answer.json';

const ajv = new Ajv({ allErrors: true });
ajvErrors(ajv);

ajv.addSchema(answerSchema, 'answer');

export default ajv;
