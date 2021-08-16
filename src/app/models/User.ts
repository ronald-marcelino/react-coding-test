export namespace User {
  export interface Owner {
    ownerId: string;
    avatarUrl: string;
  }

  export interface Model {
    id: string;
    name: string;
    owner: Owner;
  };
}

