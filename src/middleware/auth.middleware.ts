import { FastifyRequest, FastifyReply } from "fastify";
import { supabaseAdmin } from "../server";

export interface AuthenticatedRequest extends FastifyRequest {
  user?: any;
}

export const authMiddleware = async (
  request: AuthenticatedRequest,
  reply: FastifyReply
) => {
  try {
    // Verificar token no header Authorization
    const authHeader = request.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(401).send({ 
        error: true, 
        message: "Token de acesso não fornecido" 
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer "

    // Verificar token com Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return reply.status(401).send({ 
        error: true, 
        message: "Token inválido ou expirado" 
      });
    }

    // Anexar usuário à requisição
    request.user = user;
  } catch (error) {
    console.error("Auth middleware error:", error);
    return reply.status(401).send({ 
      error: true, 
      message: "Erro de autenticação" 
    });
  }
};
