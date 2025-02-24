import {
    Body,
    Controller,
    Get,
    Inject,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ORDERS_SERVICES } from 'src/config';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { PagintaionDto } from 'src/common';

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
    findAll(@Query() orderPaginationDto: OrderPaginationDto) {
        return this.ordersClient.send('findAllOrders', orderPaginationDto);
    }

    @Get('id/:id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        try {
            return await firstValueFrom(
                this.ordersClient.send('findOneOrder', { id })
            );
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @Get(':status')
    async findByStatus(
        @Param() statusDto: StatusDto,
        @Query() pagintaionDto: PagintaionDto
    ) {
        try {
            return await firstValueFrom(
                this.ordersClient.send('findAllOrders', {
                    ...pagintaionDto,
                    status: statusDto.status
                })
            );
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @Patch(':id')
    async changeStatus(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() statusDto: StatusDto
    ) {
        try {
            return await firstValueFrom(
                this.ordersClient.send('changeOrderStatus', {
                    id,
                    status: statusDto.status
                })
            );
        } catch (error) {
            throw new RpcException(error);
        }
    }
}
