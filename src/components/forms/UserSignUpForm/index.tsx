import { UserSignUpFormValues } from '@/types';
import Input from '../components/Input';
import { useForm } from 'react-hook-form';
import Button from '../../common/Button';
import { createUser } from '@/firebase';

export default function UserSignUpForm() {
  const { control, handleSubmit } = useForm<UserSignUpFormValues>({
    defaultValues: {},
  });

  async function onSubmit(data: UserSignUpFormValues) {
    const { email, password } = data;
    const user = await createUser(email, password);
    console.log(user);
  }
  return (
    <>
      <header className="py-4 text-center">
        <h1 className="text-3xl font-bold">Welcome to the TooDoo</h1>
        <span className="text-sm font-semibold"> -*- The to-do app -*- </span>
        <h3 className="font-semibold mt-4">Create an account to do your tasks.</h3>
      </header>
      <form className="py-4 w-2/3 mx-auto space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          control={control}
          label="Email"
          name="email"
          id="email"
          rules={{ required: { value: true, message: 'Email is required!' } }}
        />
        <Input
          control={control}
          label="Password"
          name="password"
          id="password"
          rules={{
            required: { value: true, message: 'Password is required!' },
          }}
          type="password"
        />
        <Input
          control={control}
          label="Re-type password"
          name="confirmPassword"
          id="confirmPassword"
          rules={{
            required: { value: true, message: 'Please re-enter the password!' },
          }}
          type="password"
        />
        <Button label="Login" className="w-full justify-center" type="submit" />

        <p className="font-semibold mt-4">Or</p>
      </form>
    </>
  );
}
