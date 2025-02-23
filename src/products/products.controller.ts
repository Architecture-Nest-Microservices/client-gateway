import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PagintaionDto } from 'src/common';
import { PRODUCTS_SERVICE } from 'src/config';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
    constructor(
        @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy
    ) {}

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productsClient.send(
            { cmd: 'create_product' },
            createProductDto
        );
    }

    @Get()
    findAllProducts(@Query() paginationDto: PagintaionDto) {
        return this.productsClient.send(
            { cmd: 'find_all_products' },
            paginationDto
        );
    }

    @Get(':id')
    async findProductById(@Param('id') id: string) {
        try {
            const product = await firstValueFrom(
                this.productsClient.send({ cmd: 'find_one_product' }, { id })
            );
            return product;
        } catch (error) {
            throw new RpcException(error);
        }
    }

    @Patch(':id')
    updateProductById(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productsClient
            .send({ cmd: 'update_product' }, { id, ...updateProductDto })
            .pipe(
                catchError(err => {
                    throw new RpcException(err);
                })
            );
    }

    @Delete(':id')
    deleteProductById(@Param('id') id: string) {
        return this.productsClient.send({ cmd: 'delete_product' }, { id }).pipe(
            catchError(err => {
                throw new RpcException(err);
            })
        );
    }
}
