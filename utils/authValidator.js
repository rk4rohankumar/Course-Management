import zod from 'zod';

const authValidatorSchema = zod.object({
    email: zod.string().email().min(4),
    password: zod.string().min(6),
    confirmPassword: zod.string().min(6),
    name: zod.string().min(2),
    role: zod.enum(['user', 'admin']),
});

const authValidator = (req,)=>{
    try{
        return authValidatorSchema.safeParse(req.body);
        
    } catch (error) {
        return false;
    }}

export default authValidator;