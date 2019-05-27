export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  bigint: any,
  timestamptz: any,
};

/** columns and relationships of "attendee" */
export type Attendee = {
  __typename?: 'attendee',
  id: Scalars['bigint'],
  remote: Scalars['Boolean'],
  /** An object relationship */
  room: Room,
  room_id: Scalars['bigint'],
  /** An object relationship */
  user: User,
  user_id: Scalars['String'],
};

/** aggregated selection of "attendee" */
export type Attendee_Aggregate = {
  __typename?: 'attendee_aggregate',
  aggregate?: Maybe<Attendee_Aggregate_Fields>,
  nodes: Array<Attendee>,
};

/** aggregate fields of "attendee" */
export type Attendee_Aggregate_Fields = {
  __typename?: 'attendee_aggregate_fields',
  avg?: Maybe<Attendee_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Attendee_Max_Fields>,
  min?: Maybe<Attendee_Min_Fields>,
  stddev?: Maybe<Attendee_Stddev_Fields>,
  stddev_pop?: Maybe<Attendee_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Attendee_Stddev_Samp_Fields>,
  sum?: Maybe<Attendee_Sum_Fields>,
  var_pop?: Maybe<Attendee_Var_Pop_Fields>,
  var_samp?: Maybe<Attendee_Var_Samp_Fields>,
  variance?: Maybe<Attendee_Variance_Fields>,
};


/** aggregate fields of "attendee" */
export type Attendee_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Attendee_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

/** order by aggregate values of table "attendee" */
export type Attendee_Aggregate_Order_By = {
  avg?: Maybe<Attendee_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Attendee_Max_Order_By>,
  min?: Maybe<Attendee_Min_Order_By>,
  stddev?: Maybe<Attendee_Stddev_Order_By>,
  stddev_pop?: Maybe<Attendee_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Attendee_Stddev_Samp_Order_By>,
  sum?: Maybe<Attendee_Sum_Order_By>,
  var_pop?: Maybe<Attendee_Var_Pop_Order_By>,
  var_samp?: Maybe<Attendee_Var_Samp_Order_By>,
  variance?: Maybe<Attendee_Variance_Order_By>,
};

/** input type for inserting array relation for remote table "attendee" */
export type Attendee_Arr_Rel_Insert_Input = {
  data: Array<Attendee_Insert_Input>,
  on_conflict?: Maybe<Attendee_On_Conflict>,
};

/** aggregate avg on columns */
export type Attendee_Avg_Fields = {
  __typename?: 'attendee_avg_fields',
  id?: Maybe<Scalars['Float']>,
  room_id?: Maybe<Scalars['Float']>,
};

/** order by avg() on columns of table "attendee" */
export type Attendee_Avg_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** Boolean expression to filter rows from the table "attendee". All fields are combined with a logical 'AND'. */
export type Attendee_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Attendee_Bool_Exp>>>,
  _not?: Maybe<Attendee_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Attendee_Bool_Exp>>>,
  id?: Maybe<Bigint_Comparison_Exp>,
  remote?: Maybe<Boolean_Comparison_Exp>,
  room?: Maybe<Room_Bool_Exp>,
  room_id?: Maybe<Bigint_Comparison_Exp>,
  user?: Maybe<User_Bool_Exp>,
  user_id?: Maybe<Text_Comparison_Exp>,
};

/** unique or primary key constraints on table "attendee" */
export enum Attendee_Constraint {
  /** unique or primary key constraint */
  AttendeePkey = 'attendee_pkey',
  /** unique or primary key constraint */
  AttendeeRoomIdKey = 'attendee_room_id_key',
  /** unique or primary key constraint */
  AttendeeUserIdKey = 'attendee_user_id_key'
}

/** input type for incrementing integer columne in table "attendee" */
export type Attendee_Inc_Input = {
  id?: Maybe<Scalars['bigint']>,
  room_id?: Maybe<Scalars['bigint']>,
};

/** input type for inserting data into table "attendee" */
export type Attendee_Insert_Input = {
  id?: Maybe<Scalars['bigint']>,
  remote?: Maybe<Scalars['Boolean']>,
  room?: Maybe<Room_Obj_Rel_Insert_Input>,
  room_id?: Maybe<Scalars['bigint']>,
  user?: Maybe<User_Obj_Rel_Insert_Input>,
  user_id?: Maybe<Scalars['String']>,
};

/** aggregate max on columns */
export type Attendee_Max_Fields = {
  __typename?: 'attendee_max_fields',
  id?: Maybe<Scalars['bigint']>,
  room_id?: Maybe<Scalars['bigint']>,
  user_id?: Maybe<Scalars['String']>,
};

/** order by max() on columns of table "attendee" */
export type Attendee_Max_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
  user_id?: Maybe<Order_By>,
};

/** aggregate min on columns */
export type Attendee_Min_Fields = {
  __typename?: 'attendee_min_fields',
  id?: Maybe<Scalars['bigint']>,
  room_id?: Maybe<Scalars['bigint']>,
  user_id?: Maybe<Scalars['String']>,
};

/** order by min() on columns of table "attendee" */
export type Attendee_Min_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
  user_id?: Maybe<Order_By>,
};

/** response of any mutation on the table "attendee" */
export type Attendee_Mutation_Response = {
  __typename?: 'attendee_mutation_response',
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'],
  /** data of the affected rows by the mutation */
  returning: Array<Attendee>,
};

/** input type for inserting object relation for remote table "attendee" */
export type Attendee_Obj_Rel_Insert_Input = {
  data: Attendee_Insert_Input,
  on_conflict?: Maybe<Attendee_On_Conflict>,
};

/** on conflict condition type for table "attendee" */
export type Attendee_On_Conflict = {
  constraint: Attendee_Constraint,
  update_columns: Array<Attendee_Update_Column>,
};

/** ordering options when selecting data from "attendee" */
export type Attendee_Order_By = {
  id?: Maybe<Order_By>,
  remote?: Maybe<Order_By>,
  room?: Maybe<Room_Order_By>,
  room_id?: Maybe<Order_By>,
  user?: Maybe<User_Order_By>,
  user_id?: Maybe<Order_By>,
};

/** select columns of table "attendee" */
export enum Attendee_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Remote = 'remote',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "attendee" */
export type Attendee_Set_Input = {
  id?: Maybe<Scalars['bigint']>,
  remote?: Maybe<Scalars['Boolean']>,
  room_id?: Maybe<Scalars['bigint']>,
  user_id?: Maybe<Scalars['String']>,
};

/** aggregate stddev on columns */
export type Attendee_Stddev_Fields = {
  __typename?: 'attendee_stddev_fields',
  id?: Maybe<Scalars['Float']>,
  room_id?: Maybe<Scalars['Float']>,
};

/** order by stddev() on columns of table "attendee" */
export type Attendee_Stddev_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** aggregate stddev_pop on columns */
export type Attendee_Stddev_Pop_Fields = {
  __typename?: 'attendee_stddev_pop_fields',
  id?: Maybe<Scalars['Float']>,
  room_id?: Maybe<Scalars['Float']>,
};

/** order by stddev_pop() on columns of table "attendee" */
export type Attendee_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** aggregate stddev_samp on columns */
export type Attendee_Stddev_Samp_Fields = {
  __typename?: 'attendee_stddev_samp_fields',
  id?: Maybe<Scalars['Float']>,
  room_id?: Maybe<Scalars['Float']>,
};

/** order by stddev_samp() on columns of table "attendee" */
export type Attendee_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** aggregate sum on columns */
export type Attendee_Sum_Fields = {
  __typename?: 'attendee_sum_fields',
  id?: Maybe<Scalars['bigint']>,
  room_id?: Maybe<Scalars['bigint']>,
};

/** order by sum() on columns of table "attendee" */
export type Attendee_Sum_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** update columns of table "attendee" */
export enum Attendee_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Remote = 'remote',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Attendee_Var_Pop_Fields = {
  __typename?: 'attendee_var_pop_fields',
  id?: Maybe<Scalars['Float']>,
  room_id?: Maybe<Scalars['Float']>,
};

/** order by var_pop() on columns of table "attendee" */
export type Attendee_Var_Pop_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** aggregate var_samp on columns */
export type Attendee_Var_Samp_Fields = {
  __typename?: 'attendee_var_samp_fields',
  id?: Maybe<Scalars['Float']>,
  room_id?: Maybe<Scalars['Float']>,
};

/** order by var_samp() on columns of table "attendee" */
export type Attendee_Var_Samp_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** aggregate variance on columns */
export type Attendee_Variance_Fields = {
  __typename?: 'attendee_variance_fields',
  id?: Maybe<Scalars['Float']>,
  room_id?: Maybe<Scalars['Float']>,
};

/** order by variance() on columns of table "attendee" */
export type Attendee_Variance_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};


/** expression to compare columns of type bigint. All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: Maybe<Scalars['bigint']>,
  _gt?: Maybe<Scalars['bigint']>,
  _gte?: Maybe<Scalars['bigint']>,
  _in?: Maybe<Array<Maybe<Scalars['bigint']>>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['bigint']>,
  _lte?: Maybe<Scalars['bigint']>,
  _neq?: Maybe<Scalars['bigint']>,
  _nin?: Maybe<Array<Maybe<Scalars['bigint']>>>,
};

/** expression to compare columns of type boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>,
  _gt?: Maybe<Scalars['Boolean']>,
  _gte?: Maybe<Scalars['Boolean']>,
  _in?: Maybe<Array<Maybe<Scalars['Boolean']>>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['Boolean']>,
  _lte?: Maybe<Scalars['Boolean']>,
  _neq?: Maybe<Scalars['Boolean']>,
  _nin?: Maybe<Array<Maybe<Scalars['Boolean']>>>,
};

/** conflict action */
export enum Conflict_Action {
  /** ignore the insert on this row */
  Ignore = 'ignore',
  /** update the row with the given values */
  Update = 'update'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root',
  /** delete data from the table: "attendee" */
  delete_attendee?: Maybe<Attendee_Mutation_Response>,
  /** delete data from the table: "queue_record" */
  delete_queue_record?: Maybe<Queue_Record_Mutation_Response>,
  /** delete data from the table: "room" */
  delete_room?: Maybe<Room_Mutation_Response>,
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>,
  /** insert data into the table: "attendee" */
  insert_attendee?: Maybe<Attendee_Mutation_Response>,
  /** insert data into the table: "queue_record" */
  insert_queue_record?: Maybe<Queue_Record_Mutation_Response>,
  /** insert data into the table: "room" */
  insert_room?: Maybe<Room_Mutation_Response>,
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>,
  /** update data of the table: "attendee" */
  update_attendee?: Maybe<Attendee_Mutation_Response>,
  /** update data of the table: "queue_record" */
  update_queue_record?: Maybe<Queue_Record_Mutation_Response>,
  /** update data of the table: "room" */
  update_room?: Maybe<Room_Mutation_Response>,
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>,
};


/** mutation root */
export type Mutation_RootDelete_AttendeeArgs = {
  where: Attendee_Bool_Exp
};


/** mutation root */
export type Mutation_RootDelete_Queue_RecordArgs = {
  where: Queue_Record_Bool_Exp
};


/** mutation root */
export type Mutation_RootDelete_RoomArgs = {
  where: Room_Bool_Exp
};


/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp
};


/** mutation root */
export type Mutation_RootInsert_AttendeeArgs = {
  objects: Array<Attendee_Insert_Input>,
  on_conflict?: Maybe<Attendee_On_Conflict>
};


/** mutation root */
export type Mutation_RootInsert_Queue_RecordArgs = {
  objects: Array<Queue_Record_Insert_Input>,
  on_conflict?: Maybe<Queue_Record_On_Conflict>
};


/** mutation root */
export type Mutation_RootInsert_RoomArgs = {
  objects: Array<Room_Insert_Input>,
  on_conflict?: Maybe<Room_On_Conflict>
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>,
  on_conflict?: Maybe<User_On_Conflict>
};


/** mutation root */
export type Mutation_RootUpdate_AttendeeArgs = {
  _inc?: Maybe<Attendee_Inc_Input>,
  _set?: Maybe<Attendee_Set_Input>,
  where: Attendee_Bool_Exp
};


/** mutation root */
export type Mutation_RootUpdate_Queue_RecordArgs = {
  _inc?: Maybe<Queue_Record_Inc_Input>,
  _set?: Maybe<Queue_Record_Set_Input>,
  where: Queue_Record_Bool_Exp
};


/** mutation root */
export type Mutation_RootUpdate_RoomArgs = {
  _inc?: Maybe<Room_Inc_Input>,
  _set?: Maybe<Room_Set_Input>,
  where: Room_Bool_Exp
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _set?: Maybe<User_Set_Input>,
  where: User_Bool_Exp
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root',
  /** fetch data from the table: "attendee" */
  attendee: Array<Attendee>,
  /** fetch aggregated fields from the table: "attendee" */
  attendee_aggregate: Attendee_Aggregate,
  /** fetch data from the table: "attendee" using primary key columns */
  attendee_by_pk?: Maybe<Attendee>,
  /** fetch data from the table: "queue_record" */
  queue_record: Array<Queue_Record>,
  /** fetch aggregated fields from the table: "queue_record" */
  queue_record_aggregate: Queue_Record_Aggregate,
  /** fetch data from the table: "queue_record" using primary key columns */
  queue_record_by_pk?: Maybe<Queue_Record>,
  /** fetch data from the table: "room" */
  room: Array<Room>,
  /** fetch aggregated fields from the table: "room" */
  room_aggregate: Room_Aggregate,
  /** fetch data from the table: "room" using primary key columns */
  room_by_pk?: Maybe<Room>,
  /** fetch data from the table: "user" */
  user: Array<User>,
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate,
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>,
};


/** query root */
export type Query_RootAttendeeArgs = {
  distinct_on?: Maybe<Array<Attendee_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Attendee_Order_By>>,
  where?: Maybe<Attendee_Bool_Exp>
};


/** query root */
export type Query_RootAttendee_AggregateArgs = {
  distinct_on?: Maybe<Array<Attendee_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Attendee_Order_By>>,
  where?: Maybe<Attendee_Bool_Exp>
};


/** query root */
export type Query_RootAttendee_By_PkArgs = {
  id: Scalars['bigint']
};


/** query root */
export type Query_RootQueue_RecordArgs = {
  distinct_on?: Maybe<Array<Queue_Record_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Queue_Record_Order_By>>,
  where?: Maybe<Queue_Record_Bool_Exp>
};


/** query root */
export type Query_RootQueue_Record_AggregateArgs = {
  distinct_on?: Maybe<Array<Queue_Record_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Queue_Record_Order_By>>,
  where?: Maybe<Queue_Record_Bool_Exp>
};


/** query root */
export type Query_RootQueue_Record_By_PkArgs = {
  id: Scalars['bigint']
};


/** query root */
export type Query_RootRoomArgs = {
  distinct_on?: Maybe<Array<Room_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Room_Order_By>>,
  where?: Maybe<Room_Bool_Exp>
};


/** query root */
export type Query_RootRoom_AggregateArgs = {
  distinct_on?: Maybe<Array<Room_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Room_Order_By>>,
  where?: Maybe<Room_Bool_Exp>
};


/** query root */
export type Query_RootRoom_By_PkArgs = {
  id: Scalars['bigint']
};


/** query root */
export type Query_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<User_Order_By>>,
  where?: Maybe<User_Bool_Exp>
};


/** query root */
export type Query_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<User_Order_By>>,
  where?: Maybe<User_Bool_Exp>
};


/** query root */
export type Query_RootUser_By_PkArgs = {
  auth_id: Scalars['String']
};

/** columns and relationships of "queue_record" */
export type Queue_Record = {
  __typename?: 'queue_record',
  finished_speaking_time?: Maybe<Scalars['timestamptz']>,
  id: Scalars['bigint'],
  joined_time: Scalars['timestamptz'],
  left_time?: Maybe<Scalars['timestamptz']>,
  /** An object relationship */
  room: Room,
  room_id: Scalars['bigint'],
  started_speaking_time?: Maybe<Scalars['timestamptz']>,
  /** An object relationship */
  user: User,
  user_id: Scalars['String'],
};

/** aggregated selection of "queue_record" */
export type Queue_Record_Aggregate = {
  __typename?: 'queue_record_aggregate',
  aggregate?: Maybe<Queue_Record_Aggregate_Fields>,
  nodes: Array<Queue_Record>,
};

/** aggregate fields of "queue_record" */
export type Queue_Record_Aggregate_Fields = {
  __typename?: 'queue_record_aggregate_fields',
  avg?: Maybe<Queue_Record_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Queue_Record_Max_Fields>,
  min?: Maybe<Queue_Record_Min_Fields>,
  stddev?: Maybe<Queue_Record_Stddev_Fields>,
  stddev_pop?: Maybe<Queue_Record_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Queue_Record_Stddev_Samp_Fields>,
  sum?: Maybe<Queue_Record_Sum_Fields>,
  var_pop?: Maybe<Queue_Record_Var_Pop_Fields>,
  var_samp?: Maybe<Queue_Record_Var_Samp_Fields>,
  variance?: Maybe<Queue_Record_Variance_Fields>,
};


/** aggregate fields of "queue_record" */
export type Queue_Record_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Queue_Record_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

/** order by aggregate values of table "queue_record" */
export type Queue_Record_Aggregate_Order_By = {
  avg?: Maybe<Queue_Record_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Queue_Record_Max_Order_By>,
  min?: Maybe<Queue_Record_Min_Order_By>,
  stddev?: Maybe<Queue_Record_Stddev_Order_By>,
  stddev_pop?: Maybe<Queue_Record_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Queue_Record_Stddev_Samp_Order_By>,
  sum?: Maybe<Queue_Record_Sum_Order_By>,
  var_pop?: Maybe<Queue_Record_Var_Pop_Order_By>,
  var_samp?: Maybe<Queue_Record_Var_Samp_Order_By>,
  variance?: Maybe<Queue_Record_Variance_Order_By>,
};

/** input type for inserting array relation for remote table "queue_record" */
export type Queue_Record_Arr_Rel_Insert_Input = {
  data: Array<Queue_Record_Insert_Input>,
  on_conflict?: Maybe<Queue_Record_On_Conflict>,
};

/** aggregate avg on columns */
export type Queue_Record_Avg_Fields = {
  __typename?: 'queue_record_avg_fields',
  id?: Maybe<Scalars['Float']>,
  room_id?: Maybe<Scalars['Float']>,
};

/** order by avg() on columns of table "queue_record" */
export type Queue_Record_Avg_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** Boolean expression to filter rows from the table "queue_record". All fields are combined with a logical 'AND'. */
export type Queue_Record_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Queue_Record_Bool_Exp>>>,
  _not?: Maybe<Queue_Record_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Queue_Record_Bool_Exp>>>,
  finished_speaking_time?: Maybe<Timestamptz_Comparison_Exp>,
  id?: Maybe<Bigint_Comparison_Exp>,
  joined_time?: Maybe<Timestamptz_Comparison_Exp>,
  left_time?: Maybe<Timestamptz_Comparison_Exp>,
  room?: Maybe<Room_Bool_Exp>,
  room_id?: Maybe<Bigint_Comparison_Exp>,
  started_speaking_time?: Maybe<Timestamptz_Comparison_Exp>,
  user?: Maybe<User_Bool_Exp>,
  user_id?: Maybe<Text_Comparison_Exp>,
};

/** unique or primary key constraints on table "queue_record" */
export enum Queue_Record_Constraint {
  /** unique or primary key constraint */
  QueueRecordPkey = 'queue_record_pkey'
}

/** input type for incrementing integer columne in table "queue_record" */
export type Queue_Record_Inc_Input = {
  id?: Maybe<Scalars['bigint']>,
  room_id?: Maybe<Scalars['bigint']>,
};

/** input type for inserting data into table "queue_record" */
export type Queue_Record_Insert_Input = {
  finished_speaking_time?: Maybe<Scalars['timestamptz']>,
  id?: Maybe<Scalars['bigint']>,
  joined_time?: Maybe<Scalars['timestamptz']>,
  left_time?: Maybe<Scalars['timestamptz']>,
  room?: Maybe<Room_Obj_Rel_Insert_Input>,
  room_id?: Maybe<Scalars['bigint']>,
  started_speaking_time?: Maybe<Scalars['timestamptz']>,
  user?: Maybe<User_Obj_Rel_Insert_Input>,
  user_id?: Maybe<Scalars['String']>,
};

/** aggregate max on columns */
export type Queue_Record_Max_Fields = {
  __typename?: 'queue_record_max_fields',
  finished_speaking_time?: Maybe<Scalars['timestamptz']>,
  id?: Maybe<Scalars['bigint']>,
  joined_time?: Maybe<Scalars['timestamptz']>,
  left_time?: Maybe<Scalars['timestamptz']>,
  room_id?: Maybe<Scalars['bigint']>,
  started_speaking_time?: Maybe<Scalars['timestamptz']>,
  user_id?: Maybe<Scalars['String']>,
};

/** order by max() on columns of table "queue_record" */
export type Queue_Record_Max_Order_By = {
  finished_speaking_time?: Maybe<Order_By>,
  id?: Maybe<Order_By>,
  joined_time?: Maybe<Order_By>,
  left_time?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
  started_speaking_time?: Maybe<Order_By>,
  user_id?: Maybe<Order_By>,
};

/** aggregate min on columns */
export type Queue_Record_Min_Fields = {
  __typename?: 'queue_record_min_fields',
  finished_speaking_time?: Maybe<Scalars['timestamptz']>,
  id?: Maybe<Scalars['bigint']>,
  joined_time?: Maybe<Scalars['timestamptz']>,
  left_time?: Maybe<Scalars['timestamptz']>,
  room_id?: Maybe<Scalars['bigint']>,
  started_speaking_time?: Maybe<Scalars['timestamptz']>,
  user_id?: Maybe<Scalars['String']>,
};

/** order by min() on columns of table "queue_record" */
export type Queue_Record_Min_Order_By = {
  finished_speaking_time?: Maybe<Order_By>,
  id?: Maybe<Order_By>,
  joined_time?: Maybe<Order_By>,
  left_time?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
  started_speaking_time?: Maybe<Order_By>,
  user_id?: Maybe<Order_By>,
};

/** response of any mutation on the table "queue_record" */
export type Queue_Record_Mutation_Response = {
  __typename?: 'queue_record_mutation_response',
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'],
  /** data of the affected rows by the mutation */
  returning: Array<Queue_Record>,
};

/** input type for inserting object relation for remote table "queue_record" */
export type Queue_Record_Obj_Rel_Insert_Input = {
  data: Queue_Record_Insert_Input,
  on_conflict?: Maybe<Queue_Record_On_Conflict>,
};

/** on conflict condition type for table "queue_record" */
export type Queue_Record_On_Conflict = {
  constraint: Queue_Record_Constraint,
  update_columns: Array<Queue_Record_Update_Column>,
};

/** ordering options when selecting data from "queue_record" */
export type Queue_Record_Order_By = {
  finished_speaking_time?: Maybe<Order_By>,
  id?: Maybe<Order_By>,
  joined_time?: Maybe<Order_By>,
  left_time?: Maybe<Order_By>,
  room?: Maybe<Room_Order_By>,
  room_id?: Maybe<Order_By>,
  started_speaking_time?: Maybe<Order_By>,
  user?: Maybe<User_Order_By>,
  user_id?: Maybe<Order_By>,
};

/** select columns of table "queue_record" */
export enum Queue_Record_Select_Column {
  /** column name */
  FinishedSpeakingTime = 'finished_speaking_time',
  /** column name */
  Id = 'id',
  /** column name */
  JoinedTime = 'joined_time',
  /** column name */
  LeftTime = 'left_time',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  StartedSpeakingTime = 'started_speaking_time',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "queue_record" */
export type Queue_Record_Set_Input = {
  finished_speaking_time?: Maybe<Scalars['timestamptz']>,
  id?: Maybe<Scalars['bigint']>,
  joined_time?: Maybe<Scalars['timestamptz']>,
  left_time?: Maybe<Scalars['timestamptz']>,
  room_id?: Maybe<Scalars['bigint']>,
  started_speaking_time?: Maybe<Scalars['timestamptz']>,
  user_id?: Maybe<Scalars['String']>,
};

/** aggregate stddev on columns */
export type Queue_Record_Stddev_Fields = {
  __typename?: 'queue_record_stddev_fields',
  id?: Maybe<Scalars['Float']>,
  room_id?: Maybe<Scalars['Float']>,
};

/** order by stddev() on columns of table "queue_record" */
export type Queue_Record_Stddev_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** aggregate stddev_pop on columns */
export type Queue_Record_Stddev_Pop_Fields = {
  __typename?: 'queue_record_stddev_pop_fields',
  id?: Maybe<Scalars['Float']>,
  room_id?: Maybe<Scalars['Float']>,
};

/** order by stddev_pop() on columns of table "queue_record" */
export type Queue_Record_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** aggregate stddev_samp on columns */
export type Queue_Record_Stddev_Samp_Fields = {
  __typename?: 'queue_record_stddev_samp_fields',
  id?: Maybe<Scalars['Float']>,
  room_id?: Maybe<Scalars['Float']>,
};

/** order by stddev_samp() on columns of table "queue_record" */
export type Queue_Record_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** aggregate sum on columns */
export type Queue_Record_Sum_Fields = {
  __typename?: 'queue_record_sum_fields',
  id?: Maybe<Scalars['bigint']>,
  room_id?: Maybe<Scalars['bigint']>,
};

/** order by sum() on columns of table "queue_record" */
export type Queue_Record_Sum_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** update columns of table "queue_record" */
export enum Queue_Record_Update_Column {
  /** column name */
  FinishedSpeakingTime = 'finished_speaking_time',
  /** column name */
  Id = 'id',
  /** column name */
  JoinedTime = 'joined_time',
  /** column name */
  LeftTime = 'left_time',
  /** column name */
  RoomId = 'room_id',
  /** column name */
  StartedSpeakingTime = 'started_speaking_time',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Queue_Record_Var_Pop_Fields = {
  __typename?: 'queue_record_var_pop_fields',
  id?: Maybe<Scalars['Float']>,
  room_id?: Maybe<Scalars['Float']>,
};

/** order by var_pop() on columns of table "queue_record" */
export type Queue_Record_Var_Pop_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** aggregate var_samp on columns */
export type Queue_Record_Var_Samp_Fields = {
  __typename?: 'queue_record_var_samp_fields',
  id?: Maybe<Scalars['Float']>,
  room_id?: Maybe<Scalars['Float']>,
};

/** order by var_samp() on columns of table "queue_record" */
export type Queue_Record_Var_Samp_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** aggregate variance on columns */
export type Queue_Record_Variance_Fields = {
  __typename?: 'queue_record_variance_fields',
  id?: Maybe<Scalars['Float']>,
  room_id?: Maybe<Scalars['Float']>,
};

/** order by variance() on columns of table "queue_record" */
export type Queue_Record_Variance_Order_By = {
  id?: Maybe<Order_By>,
  room_id?: Maybe<Order_By>,
};

/** columns and relationships of "room" */
export type Room = {
  __typename?: 'room',
  /** An array relationship */
  attendees: Array<Attendee>,
  /** An aggregated array relationship */
  attendees_aggregate: Attendee_Aggregate,
  id: Scalars['bigint'],
  name: Scalars['String'],
  /** An array relationship */
  queue: Array<Queue_Record>,
  /** An aggregated array relationship */
  queue_aggregate: Queue_Record_Aggregate,
};


/** columns and relationships of "room" */
export type RoomAttendeesArgs = {
  distinct_on?: Maybe<Array<Attendee_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Attendee_Order_By>>,
  where?: Maybe<Attendee_Bool_Exp>
};


/** columns and relationships of "room" */
export type RoomAttendees_AggregateArgs = {
  distinct_on?: Maybe<Array<Attendee_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Attendee_Order_By>>,
  where?: Maybe<Attendee_Bool_Exp>
};


/** columns and relationships of "room" */
export type RoomQueueArgs = {
  distinct_on?: Maybe<Array<Queue_Record_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Queue_Record_Order_By>>,
  where?: Maybe<Queue_Record_Bool_Exp>
};


/** columns and relationships of "room" */
export type RoomQueue_AggregateArgs = {
  distinct_on?: Maybe<Array<Queue_Record_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Queue_Record_Order_By>>,
  where?: Maybe<Queue_Record_Bool_Exp>
};

/** aggregated selection of "room" */
export type Room_Aggregate = {
  __typename?: 'room_aggregate',
  aggregate?: Maybe<Room_Aggregate_Fields>,
  nodes: Array<Room>,
};

/** aggregate fields of "room" */
export type Room_Aggregate_Fields = {
  __typename?: 'room_aggregate_fields',
  avg?: Maybe<Room_Avg_Fields>,
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<Room_Max_Fields>,
  min?: Maybe<Room_Min_Fields>,
  stddev?: Maybe<Room_Stddev_Fields>,
  stddev_pop?: Maybe<Room_Stddev_Pop_Fields>,
  stddev_samp?: Maybe<Room_Stddev_Samp_Fields>,
  sum?: Maybe<Room_Sum_Fields>,
  var_pop?: Maybe<Room_Var_Pop_Fields>,
  var_samp?: Maybe<Room_Var_Samp_Fields>,
  variance?: Maybe<Room_Variance_Fields>,
};


/** aggregate fields of "room" */
export type Room_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Room_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

/** order by aggregate values of table "room" */
export type Room_Aggregate_Order_By = {
  avg?: Maybe<Room_Avg_Order_By>,
  count?: Maybe<Order_By>,
  max?: Maybe<Room_Max_Order_By>,
  min?: Maybe<Room_Min_Order_By>,
  stddev?: Maybe<Room_Stddev_Order_By>,
  stddev_pop?: Maybe<Room_Stddev_Pop_Order_By>,
  stddev_samp?: Maybe<Room_Stddev_Samp_Order_By>,
  sum?: Maybe<Room_Sum_Order_By>,
  var_pop?: Maybe<Room_Var_Pop_Order_By>,
  var_samp?: Maybe<Room_Var_Samp_Order_By>,
  variance?: Maybe<Room_Variance_Order_By>,
};

/** input type for inserting array relation for remote table "room" */
export type Room_Arr_Rel_Insert_Input = {
  data: Array<Room_Insert_Input>,
  on_conflict?: Maybe<Room_On_Conflict>,
};

/** aggregate avg on columns */
export type Room_Avg_Fields = {
  __typename?: 'room_avg_fields',
  id?: Maybe<Scalars['Float']>,
};

/** order by avg() on columns of table "room" */
export type Room_Avg_Order_By = {
  id?: Maybe<Order_By>,
};

/** Boolean expression to filter rows from the table "room". All fields are combined with a logical 'AND'. */
export type Room_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Room_Bool_Exp>>>,
  _not?: Maybe<Room_Bool_Exp>,
  _or?: Maybe<Array<Maybe<Room_Bool_Exp>>>,
  attendees?: Maybe<Attendee_Bool_Exp>,
  id?: Maybe<Bigint_Comparison_Exp>,
  name?: Maybe<Text_Comparison_Exp>,
  queue?: Maybe<Queue_Record_Bool_Exp>,
};

/** unique or primary key constraints on table "room" */
export enum Room_Constraint {
  /** unique or primary key constraint */
  RoomIdKey = 'room_id_key',
  /** unique or primary key constraint */
  RoomNameKey = 'room_name_key',
  /** unique or primary key constraint */
  RoomPkey = 'room_pkey'
}

/** input type for incrementing integer columne in table "room" */
export type Room_Inc_Input = {
  id?: Maybe<Scalars['bigint']>,
};

/** input type for inserting data into table "room" */
export type Room_Insert_Input = {
  attendees?: Maybe<Attendee_Arr_Rel_Insert_Input>,
  id?: Maybe<Scalars['bigint']>,
  name?: Maybe<Scalars['String']>,
  queue?: Maybe<Queue_Record_Arr_Rel_Insert_Input>,
};

/** aggregate max on columns */
export type Room_Max_Fields = {
  __typename?: 'room_max_fields',
  id?: Maybe<Scalars['bigint']>,
  name?: Maybe<Scalars['String']>,
};

/** order by max() on columns of table "room" */
export type Room_Max_Order_By = {
  id?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
};

/** aggregate min on columns */
export type Room_Min_Fields = {
  __typename?: 'room_min_fields',
  id?: Maybe<Scalars['bigint']>,
  name?: Maybe<Scalars['String']>,
};

/** order by min() on columns of table "room" */
export type Room_Min_Order_By = {
  id?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
};

/** response of any mutation on the table "room" */
export type Room_Mutation_Response = {
  __typename?: 'room_mutation_response',
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'],
  /** data of the affected rows by the mutation */
  returning: Array<Room>,
};

/** input type for inserting object relation for remote table "room" */
export type Room_Obj_Rel_Insert_Input = {
  data: Room_Insert_Input,
  on_conflict?: Maybe<Room_On_Conflict>,
};

/** on conflict condition type for table "room" */
export type Room_On_Conflict = {
  constraint: Room_Constraint,
  update_columns: Array<Room_Update_Column>,
};

/** ordering options when selecting data from "room" */
export type Room_Order_By = {
  attendees_aggregate?: Maybe<Attendee_Aggregate_Order_By>,
  id?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
  queue_aggregate?: Maybe<Queue_Record_Aggregate_Order_By>,
};

/** select columns of table "room" */
export enum Room_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "room" */
export type Room_Set_Input = {
  id?: Maybe<Scalars['bigint']>,
  name?: Maybe<Scalars['String']>,
};

/** aggregate stddev on columns */
export type Room_Stddev_Fields = {
  __typename?: 'room_stddev_fields',
  id?: Maybe<Scalars['Float']>,
};

/** order by stddev() on columns of table "room" */
export type Room_Stddev_Order_By = {
  id?: Maybe<Order_By>,
};

/** aggregate stddev_pop on columns */
export type Room_Stddev_Pop_Fields = {
  __typename?: 'room_stddev_pop_fields',
  id?: Maybe<Scalars['Float']>,
};

/** order by stddev_pop() on columns of table "room" */
export type Room_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>,
};

/** aggregate stddev_samp on columns */
export type Room_Stddev_Samp_Fields = {
  __typename?: 'room_stddev_samp_fields',
  id?: Maybe<Scalars['Float']>,
};

/** order by stddev_samp() on columns of table "room" */
export type Room_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>,
};

/** aggregate sum on columns */
export type Room_Sum_Fields = {
  __typename?: 'room_sum_fields',
  id?: Maybe<Scalars['bigint']>,
};

/** order by sum() on columns of table "room" */
export type Room_Sum_Order_By = {
  id?: Maybe<Order_By>,
};

/** update columns of table "room" */
export enum Room_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type Room_Var_Pop_Fields = {
  __typename?: 'room_var_pop_fields',
  id?: Maybe<Scalars['Float']>,
};

/** order by var_pop() on columns of table "room" */
export type Room_Var_Pop_Order_By = {
  id?: Maybe<Order_By>,
};

/** aggregate var_samp on columns */
export type Room_Var_Samp_Fields = {
  __typename?: 'room_var_samp_fields',
  id?: Maybe<Scalars['Float']>,
};

/** order by var_samp() on columns of table "room" */
export type Room_Var_Samp_Order_By = {
  id?: Maybe<Order_By>,
};

/** aggregate variance on columns */
export type Room_Variance_Fields = {
  __typename?: 'room_variance_fields',
  id?: Maybe<Scalars['Float']>,
};

/** order by variance() on columns of table "room" */
export type Room_Variance_Order_By = {
  id?: Maybe<Order_By>,
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root',
  /** fetch data from the table: "attendee" */
  attendee: Array<Attendee>,
  /** fetch aggregated fields from the table: "attendee" */
  attendee_aggregate: Attendee_Aggregate,
  /** fetch data from the table: "attendee" using primary key columns */
  attendee_by_pk?: Maybe<Attendee>,
  /** fetch data from the table: "queue_record" */
  queue_record: Array<Queue_Record>,
  /** fetch aggregated fields from the table: "queue_record" */
  queue_record_aggregate: Queue_Record_Aggregate,
  /** fetch data from the table: "queue_record" using primary key columns */
  queue_record_by_pk?: Maybe<Queue_Record>,
  /** fetch data from the table: "room" */
  room: Array<Room>,
  /** fetch aggregated fields from the table: "room" */
  room_aggregate: Room_Aggregate,
  /** fetch data from the table: "room" using primary key columns */
  room_by_pk?: Maybe<Room>,
  /** fetch data from the table: "user" */
  user: Array<User>,
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate,
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>,
};


/** subscription root */
export type Subscription_RootAttendeeArgs = {
  distinct_on?: Maybe<Array<Attendee_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Attendee_Order_By>>,
  where?: Maybe<Attendee_Bool_Exp>
};


/** subscription root */
export type Subscription_RootAttendee_AggregateArgs = {
  distinct_on?: Maybe<Array<Attendee_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Attendee_Order_By>>,
  where?: Maybe<Attendee_Bool_Exp>
};


/** subscription root */
export type Subscription_RootAttendee_By_PkArgs = {
  id: Scalars['bigint']
};


/** subscription root */
export type Subscription_RootQueue_RecordArgs = {
  distinct_on?: Maybe<Array<Queue_Record_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Queue_Record_Order_By>>,
  where?: Maybe<Queue_Record_Bool_Exp>
};


/** subscription root */
export type Subscription_RootQueue_Record_AggregateArgs = {
  distinct_on?: Maybe<Array<Queue_Record_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Queue_Record_Order_By>>,
  where?: Maybe<Queue_Record_Bool_Exp>
};


/** subscription root */
export type Subscription_RootQueue_Record_By_PkArgs = {
  id: Scalars['bigint']
};


/** subscription root */
export type Subscription_RootRoomArgs = {
  distinct_on?: Maybe<Array<Room_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Room_Order_By>>,
  where?: Maybe<Room_Bool_Exp>
};


/** subscription root */
export type Subscription_RootRoom_AggregateArgs = {
  distinct_on?: Maybe<Array<Room_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<Room_Order_By>>,
  where?: Maybe<Room_Bool_Exp>
};


/** subscription root */
export type Subscription_RootRoom_By_PkArgs = {
  id: Scalars['bigint']
};


/** subscription root */
export type Subscription_RootUserArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<User_Order_By>>,
  where?: Maybe<User_Bool_Exp>
};


/** subscription root */
export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: Maybe<Array<User_Select_Column>>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>,
  order_by?: Maybe<Array<User_Order_By>>,
  where?: Maybe<User_Bool_Exp>
};


/** subscription root */
export type Subscription_RootUser_By_PkArgs = {
  auth_id: Scalars['String']
};

/** expression to compare columns of type text. All fields are combined with logical 'AND'. */
export type Text_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>,
  _gt?: Maybe<Scalars['String']>,
  _gte?: Maybe<Scalars['String']>,
  _ilike?: Maybe<Scalars['String']>,
  _in?: Maybe<Array<Maybe<Scalars['String']>>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _like?: Maybe<Scalars['String']>,
  _lt?: Maybe<Scalars['String']>,
  _lte?: Maybe<Scalars['String']>,
  _neq?: Maybe<Scalars['String']>,
  _nilike?: Maybe<Scalars['String']>,
  _nin?: Maybe<Array<Maybe<Scalars['String']>>>,
  _nlike?: Maybe<Scalars['String']>,
  _nsimilar?: Maybe<Scalars['String']>,
  _similar?: Maybe<Scalars['String']>,
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>,
  _gt?: Maybe<Scalars['timestamptz']>,
  _gte?: Maybe<Scalars['timestamptz']>,
  _in?: Maybe<Array<Maybe<Scalars['timestamptz']>>>,
  _is_null?: Maybe<Scalars['Boolean']>,
  _lt?: Maybe<Scalars['timestamptz']>,
  _lte?: Maybe<Scalars['timestamptz']>,
  _neq?: Maybe<Scalars['timestamptz']>,
  _nin?: Maybe<Array<Maybe<Scalars['timestamptz']>>>,
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user',
  auth_id: Scalars['String'],
  avatar?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate',
  aggregate?: Maybe<User_Aggregate_Fields>,
  nodes: Array<User>,
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields',
  count?: Maybe<Scalars['Int']>,
  max?: Maybe<User_Max_Fields>,
  min?: Maybe<User_Min_Fields>,
};


/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<User_Select_Column>>,
  distinct?: Maybe<Scalars['Boolean']>
};

/** order by aggregate values of table "user" */
export type User_Aggregate_Order_By = {
  count?: Maybe<Order_By>,
  max?: Maybe<User_Max_Order_By>,
  min?: Maybe<User_Min_Order_By>,
};

/** input type for inserting array relation for remote table "user" */
export type User_Arr_Rel_Insert_Input = {
  data: Array<User_Insert_Input>,
  on_conflict?: Maybe<User_On_Conflict>,
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<User_Bool_Exp>>>,
  _not?: Maybe<User_Bool_Exp>,
  _or?: Maybe<Array<Maybe<User_Bool_Exp>>>,
  auth_id?: Maybe<Text_Comparison_Exp>,
  avatar?: Maybe<Text_Comparison_Exp>,
  name?: Maybe<Text_Comparison_Exp>,
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint */
  UserAuthIdKey = 'user_auth_id_key',
  /** unique or primary key constraint */
  UserPkey = 'user_pkey'
}

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  auth_id?: Maybe<Scalars['String']>,
  avatar?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields',
  auth_id?: Maybe<Scalars['String']>,
  avatar?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

/** order by max() on columns of table "user" */
export type User_Max_Order_By = {
  auth_id?: Maybe<Order_By>,
  avatar?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields',
  auth_id?: Maybe<Scalars['String']>,
  avatar?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

/** order by min() on columns of table "user" */
export type User_Min_Order_By = {
  auth_id?: Maybe<Order_By>,
  avatar?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response',
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'],
  /** data of the affected rows by the mutation */
  returning: Array<User>,
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input,
  on_conflict?: Maybe<User_On_Conflict>,
};

/** on conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint,
  update_columns: Array<User_Update_Column>,
};

/** ordering options when selecting data from "user" */
export type User_Order_By = {
  auth_id?: Maybe<Order_By>,
  avatar?: Maybe<Order_By>,
  name?: Maybe<Order_By>,
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  AuthId = 'auth_id',
  /** column name */
  Avatar = 'avatar',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  auth_id?: Maybe<Scalars['String']>,
  avatar?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  AuthId = 'auth_id',
  /** column name */
  Avatar = 'avatar',
  /** column name */
  Name = 'name'
}
