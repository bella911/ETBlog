import React from "react";

function SuggestedUser() {
  return (
    <div>
      {currentUser && (
        <div className="sm:pt-12 px-4 mb-4 sm:mt-12  text-gray-700 dark:text-gray-200 w-full md:max-w-[350px] lg:w-[600px]  mx-auto text-lg md:ml-4 leading-relaxed">
          {/* <SuggestedUser suggestedUserIndex = {allUsers?.length} /> */}
          {/* <div className="w-full max-w-md mx-auto p-4 h-[50%] hidden lg:inline  bg-white border   rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"> */}
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-gray-200 ">
              You Might LIke
            </h5>
            <Button
              gradientDuoTone="greenToBlue"
              size="xs"
              onClick={() => {
                suggestedUserIndex = allUsers?.length;
                setViewAll(true);
              }}
            >
              View All
            </Button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center mt-20">
              <ClipLoader speedMultiplier="0.5" size="30px" />
            </div>
          ) : viewAll ? (
            allUsers.map(
              (user, index) =>
                index < allUsers?.length &&
                checkFollowers.includes(user._id) && ( // restrict index size
                  <div
                    key={index}
                    className={`flow-root ${
                      currentUser?._id === user._id && "hidden"
                    }`}
                  >
                    {/* jump authenticate user from suggestion friend */}
                    <ul
                      role="list"
                      className="divide-y divide-gray-200 dark:divide-gray-700"
                    >
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Link to={`/user/${user.username}`}>
                              <img
                                className="w-8 h-8 rounded-full"
                                src={user.profilePicture}
                                alt="Neil image"
                              />
                            </Link>
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <Link
                              to={`/user/${user.username}`}
                              className="text-sm font-medium text-gray-900 truncate dark:text-gray-200 "
                            >
                              {user.username}
                            </Link>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>
                          <div>
                            {/* check the user id and author page is same or current user logged in the apply dynamic following */}
                            {
                              <Button
                                key={user._id}
                                gradientDuoTone="greenToBlue"
                                size="xs"
                                outline
                                className="mt-2 mr-1"
                                onClick={() => {
                                  suggestedUserFollowUnFollow(user._id);
                                  // setCounter(true)
                                  // console.log(user._id)
                                }}
                                disabled={loading}
                              >
                                Follow
                                {/* {checkFollowers.includes(user._id) ? "Following" : "Follow"} */}
                              </Button>
                            }
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                )
            )
          ) : (
            allUsers.map(
              (user, index) =>
                index < 2 &&
                checkFollowers.includes(user._id) && (
                  <div key={index} className="flow-root">
                    <ul
                      role="list"
                      className="divide-y divide-gray-200 dark:divide-gray-700"
                    >
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Link to={`/user/${user.username}`}>
                              <img
                                className="w-8 h-8 rounded-full"
                                src={user.profilePicture}
                                alt="Neil image"
                              />
                            </Link>
                          </div>
                          <div className="flex-1 min-w-0 ms-4">
                            <Link
                              to={`/user/${user.username}`}
                              className="text-sm font-medium text-gray-900 truncate dark:text-gray-200 "
                            >
                              {user.username}
                            </Link>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>
                          <Button
                            gradientDuoTone="greenToBlue"
                            outline
                            size="xs"
                          >
                            Follow
                          </Button>
                        </div>
                      </li>
                    </ul>
                  </div>
                )
            )
          )}
        </div>
      )}
    </div>
  );
}

export default SuggestedUser;
