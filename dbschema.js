let db = {
    user: [
        {
            userId: 'fhDr1XNg8iXBFUv3GiyEFLvnJEH3',
            email: 'user@gmail.com',
            handle: 'user',
            createdAt: '2020-09-21T18:25:56.474Z',
            imageUrl: 'https://firebasestorage.googleapis.com/v0/b/socialapp-1249f.appspot.com/o/8863530942.png?alt=media',
            bio: 'Hello, my name is user, nice to  meet you',
            website: 'https://user.com',
            location: 'India',
        }
    ],
    screams: [
        {
            userHandle: "user",
            body: "this is the scream body",
            createdAt: "2020-09-21T10:12:05.599Z",
            likeCount: 5,
            commentCount: 2,
        }
    ],
    comments: [
        {
            userHandle: "user",
            screamId: "fhDr1XNg8iXBFUv3GiyEFLvnJEH",
            body: "nice one!",
            createdAt: "2020-09-21T10:12:05.599Z"
        }
    ]
};

const userDetails = {
    // Redux
    credentials: {
        userId: 'fhDr1XNg8iXBFUv3GiyEFLvnJEH3',
        email: 'user@gmail.com',
        handle: 'user',
        createdAt: '2020-09-21T18:25:56.474Z',
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/socialapp-1249f.appspot.com/o/8863530942.png?alt=media',
        bio: 'Hello, my name is user, nice to  meet you',
        website: 'https://user.com',
        location: 'India',
    },
    likes: [
        {
            userHandle: 'user',
            screamId: 'fhDr1XNg8iXBFUv3GiyEFLvnJEH3'
        },
        {
            userHandle: 'user',
            screamId: 'fhDr1XNg8iXBFUv3GiyEFLvnJEH3'
        }
    ]
}
