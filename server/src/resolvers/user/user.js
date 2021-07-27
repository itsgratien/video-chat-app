class User {
  getProfile = async (_, value, { dataSources }) => {
    try {
      const find = await dataSources.userAPI.getProfile(value.id);

      if (!find) {
        return null;
      }

      return find;
    } catch (error) {
      throw new Error('Unable to fetch data due to an internal server error');
    }
  };
}

exports.user = new User();
