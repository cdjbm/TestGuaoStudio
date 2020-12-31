import {
  DefaultCrudRepository,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {Users, UsersRelations, Blogs} from '../models';
import {MongoDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BlogsRepository} from './blogs.repository';

export type Credential = {
  email: string;
  password: string;
};
export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype._id,
  UsersRelations
> {
  public readonly blogs: HasManyRepositoryFactory<
    Blogs,
    typeof Users.prototype._id
  >;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('BlogsRepository')
    protected blogsRepositoryGetter: Getter<BlogsRepository>,
  ) {
    super(Users, dataSource);
    this.blogs = this.createHasManyRepositoryFactoryFor(
      'blogs',
      blogsRepositoryGetter,
    );
    this.registerInclusionResolver('blogs', this.blogs.inclusionResolver);
  }
}
