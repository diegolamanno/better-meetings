
declare module '*/queries.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const getUser: DocumentNode;
export const addAttendeeToRoom: DocumentNode;
export const createRoom: DocumentNode;
export const getRoom: DocumentNode;
export const addUser: DocumentNode;
export const subscribeToRoom: DocumentNode;
export const addAttendeeToQueue: DocumentNode;
export const removeAttendeeFromQueue: DocumentNode;
export const removeAttendeeFromRoom: DocumentNode;

  export default defaultDocument;
}
    