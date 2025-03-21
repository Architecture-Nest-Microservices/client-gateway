import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter<RpcException> {
    catch(exception: RpcException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const rpcError = exception.getError();

        if (
            typeof rpcError === 'object' &&
            'status' in rpcError &&
            'message' in rpcError
        ) {
            // const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;
            // const status = rpcError.status;
            const status =
                typeof rpcError.status === 'number' ? rpcError.status : 400;
            return response.status(status).json(rpcError);
        }

        response.status(400).json({
            status: 400,
            message: rpcError
        });
    }
}
