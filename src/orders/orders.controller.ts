import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICES } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
    constructor(
        @Inject(ORDERS_SERVICES) private readonly ordersClient: ClientProxy
    ) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersClient.send('createOrder', createOrderDto);
    }

    @Get()
    findAll() {
        return this.ordersClient.send('findAllOrders', {});
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await firstValueFrom(
                this.ordersClient.send('findOneOrder', { id })
            );
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
