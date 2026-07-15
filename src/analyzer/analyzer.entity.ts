import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('slow_query_logs')
export class Analyzer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  query: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  parameters?: unknown[];

  @Column({
    name: 'execution_time',
    type: 'integer',
  })
  executionTime: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}
