/**
 * The Todo Model
 */
export class Todo {
    gid!: string;
    constructor(public title: string, public completed: boolean) { }
}
