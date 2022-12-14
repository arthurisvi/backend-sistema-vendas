import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrdersProducts1669424435401 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orders_products',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2
                },
                {
                    name: 'quantity',
                    type: 'integer'
                },
                {
                    name: 'order_id',
                    type: 'uuid',
                    isNullable: true
                },
                {
                    name: 'product_id',
                    type: 'uuid',
                    isNullable: true
                },
                {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp with time zone',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    name: "fk_orders_products_order",
                    referencedTableName: "orders",
                    referencedColumnNames: ["id"],
                    columnNames: ["order_id"],
                    onDelete: "SET NULL",
                },
                {
                    name: "fk_orders_products_product",
                    referencedTableName: "products",
                    referencedColumnNames: ["id"],
                    columnNames: ["product_id"],
                    onDelete: "SET NULL",
                }

            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orders_products');
    }

}
