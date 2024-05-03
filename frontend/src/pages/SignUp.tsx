import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/default/Untitled design.png'
import { useSignup } from '../hooks/useSignup';
// import DefaultLayout from '../../layout/DefaultLayout';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loader from '../common/Loader/Loader';



const SignUp: React.FC = () => {
const oneUpperCase = new RegExp(/^(?=.*?[A-Z])^/)
const oneLowerCase = new RegExp(/^(?=.*?[a-z])^/)
const oneDigit = new RegExp(/^(?=.*?[0-9])^/)
const oneSpecialCharacter = new RegExp(/^(?=.*?[#?!@$%^&*-])^/)

const validationSchema = z.object({
  name: z
  .string()
  .min(1, { message: 'Must have at least 1 character' })
  .regex(/^[A-Z a-z]+$/i, {message: "Only letters are allowed"}),
  email: z
    .string()
    .min(1, { message: 'Must have at least 1 character' })
    .email({
      message: 'Must be a valid email',
    }),
  password: z
    .string()
    .min(1, { message: 'Must have at least 1 character' })
    .regex(oneUpperCase, {
      message: 'Your password needs atleast one Uppercase letter',
    })
    .regex(oneLowerCase, {
      message: 'Your password needs atleast one Lowercase letter',
    })
    .regex(oneDigit, {
      message: 'Your password needs atleast one Digit',
    })
    .regex(oneSpecialCharacter, {
      message: 'Your password needs atleast one Special Character',
    })
    .min(8),
  confirmed_password: z
  .string()
  .min(1, { message: 'Must have at least 1 character' })
  .regex(oneUpperCase, {
    message: 'Your password needs atleast one Uppercase letter',
  })
  .regex(oneLowerCase, {
    message: 'Your password needs atleast one Lowercase letter',
  })
  .regex(oneDigit, {
    message: 'Your password needs atleast one Digit',
  })
  .regex(oneSpecialCharacter, {
    message: 'Your password needs atleast one Special Character',
  })
  .min(8),
  picture_url: z
  .string()
  .optional()
  .nullable(),
  })
  .refine((data) => data.password === data.confirmed_password, {
    message: "Passwords do not match",
    path: ["confirmed_password"],
  });

  type SchemaProps = z.infer<typeof validationSchema>;

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaProps>({
    resolver: zodResolver(validationSchema),
  });

  const [isIncomplete, setIsIncomplete] = useState<boolean>(true)
  const [view, setView] = useState<boolean>(false)
  const [filename, setFilename] = useState<string | undefined>("")
  const [picture, setPicture] = useState <File | undefined>()
  const [Img,setImg] = useState<string | any>("")
  const {signup, error, isLoading} = useSignup()

   const handleChange = (event: React.ChangeEvent<HTMLInputElement | undefined> ) => {
    try{
      if(event.target.files)
      setPicture(event.target.files[0])
      if(event.target.files)
      setFilename(event.target.files[0].name)
      if (event.target.files){
        var reader = new FileReader();
        reader.onloadend = () => {
          setImg(reader.result)
        }
        if(event.target.files[0]){
          reader.readAsDataURL(event.target.files[0]);
        }
      }
    } catch(err){
      console.log(err)
    }
   }

  const SubmitForm = async (e: SchemaProps) => {
    if (typeof picture !== 'undefined'){
      const formData = new FormData();
      formData.append('file',picture);
      formData.append('upload_preset','brainop-react-internship-test');
      formData.append('api_key',process.env.REACT_APP_ACCESS_KEY as string)
      const result = await fetch("https://api.cloudinary.com/v1_1/dojd1iecm/image/upload",{
      method: 'POST',
      body: formData
    }).then(res => res.json())
    register("picture_url",{
      value: result.secure_url
    })
    //console.log("info:",info)
    }else{
      register("picture_url",{
        value: null
      })
    //console.log("info:",info) 
    }
    const info = watch()
    await signup(info.name,info.email,info.password,info.confirmed_password,info.picture_url)
    alert("Welcome!")
}

  return (
    <>
    <div className="rounded-md border my-25 lg:my-25 xl:mx-75 mx-7.5 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full xl:w-[75%]">
            <div className="w-full p-5 md:p-10.5 lg:p-15.5">
            <div className='w-full flex justify-center'>
               <h2 className="my-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to PostApp
              </h2> 
            </div>
              <form onSubmit={handleSubmit(SubmitForm)}>
                {error && <span className="text-primary">{error}</span>}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Name 
                  </label>
                  {errors?.name && <span className='text-primary'>{errors.name.message}</span>}
                  <div className="relative">
                    <input
                      required
                      {...register("name")}
                      name='name'
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                            fill=""
                          />
                          <path
                            d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  {errors?.email && <span className='text-primary'>{errors.email.message}</span>}
                  <div className="relative">
                    <input
                    required
                      {...register("email")}
                      name='email'
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  {errors?.password && <span className='text-primary'>{errors.password.message}</span>}
                  <div className="relative">
                    <input
                    required
                      {...register("password")}
                      name='password'
                      type={view?"text":"password"}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Re-type Password
                  </label>
                  {errors?.confirmed_password&& <span className='text-primary'>{errors.confirmed_password.message}</span>}
                  <div className="relative">
                    <input
                    required
                      {...register("confirmed_password")}
                      name='confirmed_password'
                      type={view?"text":"password"}
                      placeholder="Re-enter your password"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />

                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                            fill=""
                          />
                          <path
                            d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-6 flex gap-2">
                  <input
                  type='checkbox'
                  className='accent-primary'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.checked?setView(true):setView(false)}
                  />
                  <label>
                     Show Password
                  </label>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Profile Picture (optional)
                  </label>
                  <div className="relative">
                    <div className='flex justify-between gap-1'>
                    <label
                    className=" lg:w-[45%] w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-xs lg:text-base text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >{(filename=="")?"No Profile Picture chosen yet":filename}</label>
                    <label 
                    htmlFor='picture'
                    className=' lg:w-[25%] w-full text-center items-center rounded-lg border border-stroke bg-primary py-4 pl-6 pr-10 text-xs lg:text-base  text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary'
                    >
                        Upload Picture
                    </label>  
                    </div>
                    <div>
                        <img src={(Img=="")?Logo:Img} alt='Profile Pic' className='h-30 w-30 lg:h-50 lg:w-50 mt-5 rounded-[50%] border-8 border-primary'/>
                    </div>
                    <input
                    //   value={user.confirmed_password}
                      onChange={handleChange}
                      name='picture'
                      type="file"
                      placeholder="Choose Profile Picture"
                      accept="image/png, image/jpeg, image/jpg"
                      id='picture'
                      className=" opacity-0"
                    />
                  </div>
                </div>
                <div className="mb-5 flex gap-2">
                  <input
                  type='checkbox'
                  className='accent-primary'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.checked?setIsIncomplete(false):setIsIncomplete(true)}
                  />
                  <label>
                    I agree with the  
                    <a className='text-primary hover:cursor-pointer'> Terms & Conditions </a>
                  </label>
                </div>
                {isIncomplete && <span className="text-primary/40">Check Terms & Conditions Checkbox to Sign Up</span>}
                <div className="mb-5">
                  <input
                    disabled={isIncomplete || isLoading}
                    type="submit"
                    value="Sign Up"
                    className={`w-full cursor-pointer rounded-lg border border-primary p-4 text-white transition bg-primary ${(isIncomplete? " line-through" : " hover:bg-opacity-90")}` }
                  />
                </div>
                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link to="/signin" className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
            <div className='flex w-full justify-center items-center align-middle'>
                {isLoading&& <Loader/>}
            </div>
          </div>
        </div>
      </div>
      <div className='flex w-full justify-center items-center align-middle'>
      {isLoading&& <Loader/>}
    </div>
    </>
  );
};

export default SignUp;
