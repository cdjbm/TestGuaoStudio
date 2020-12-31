import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Blogs, BlogsRelations, Users} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsersRepository} from './users.repository';

export class BlogsRepository extends DefaultCrudRepository<
  Blogs,
  typeof Blogs.prototype._id,
  BlogsRelations
> {

  public readonly users: BelongsToAccessor<Users, typeof Blogs.prototype._id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Blogs, dataSource);
    this.users = this.createBelongsToAccessorFor('users', usersRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
