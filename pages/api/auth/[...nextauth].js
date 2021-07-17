import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { findOneUser, verifyPassword } from '../../../services/mongooseHelpers';

export default NextAuth({
    session: { jwt: true },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const user = await findOneUser(credentials.email);
                
                if (!user) {
                    console.log('No user found!');
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                console.log(isValid);

                if (!isValid) {
                    console.log('Couldnt log you in!');
                    throw new Error('Couldnt log you in!');
                }
                return { email: user.email, name: user.firstName + ' ' +  user.lastName};
            },
        }),
    ],
});
