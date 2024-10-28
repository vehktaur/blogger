import Input from "../ui/input";

const Password = () => {
  return (
    <form className='space-y-8' noValidate>
      <div className='sm:w-1/2 sm:pe-4'>
        <Input
          label='Password'
          name='password'
          type='password'
          required={true}
        />
      </div>

      <div className='flex flex-col items-start justify-between gap-8 sm:flex-row'>
        <Input label='New Password' name='newPassword' type='password' />
        <Input
          label='Confirm New Password'
          name='confirmPassword'
          type='password'
        />
      </div>
    </form>
  );
};
export default Password;
