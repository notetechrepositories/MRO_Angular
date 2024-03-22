import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  @ViewChild('PicturePreview') picturePreview: ElementRef<HTMLImageElement>;
  active: boolean = false;
  isEnable: boolean = false;
  firstnameContent: string = '';
  lastNameContent: string = '';
  EmailContent: string = '';
  PhoneContent: string = '';
  addressContent: string = '';
  pinContent: number | undefined;
  firstName?: string = '';
  lastName?: string = '';
  Email: string = '';
  Phone: string = '';
  address: string = '';
  pin?: number;
  user: User = new User();
  userData: any;
  designationId: string = '';
  officeId: string = '';
  address2: string = '';
  cityId: string = '';
  usersReportFolder: string = '';
  profileImagePath: string = '';
  updatedBy: string = '';
  id_t5_m_users: string = "";
  action: string = "view";
  fake_name: string = "user";
  pgm_id: string = "0";
  webOrApp: string = 'jxIMqe416ulhwa2yrfMg7g==';

  constructor(private ds: DataService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.isEnable = false;
    this.getUserDetails();

  }
  toggleEdit(): void {
    this.isEnable = !this.isEnable; // Toggle the state
  }
  onFileSelected(event: Event): void {
    this.isEnable=false;
    const element = event.currentTarget as HTMLInputElement;
    let file = element.files?.item(0);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        // Set the loaded file's data URL as the src for the image
        this.picturePreview.nativeElement.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  upload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      const uploadedImage = document.getElementById(
        'uploadedImage'
      )! as HTMLImageElement;
      uploadedImage.src = reader.result as string;
      uploadedImage.style.display = 'block';
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  isEdit() {
      this.isEnable = !this.isEnable;
      this.updateInputFields();
    
  }


  getUserDetails() {
    this.id_t5_m_users = localStorage.getItem('UserId');
    this.ds.getUserDetails(this.id_t5_m_users, this.action, this.fake_name, this.pgm_id).subscribe({
      next: (response) => {
        if (response && response.data && response.data.length > 0) {
          this.userData = response.data[0];
          console.log("userDataa", this.userData)
          this.updateInputFields();
          console.log("userdata", this.updateInputFields);
        } else {
          console.error('User data not found in the response');
        }
      },
      error: (error) => {
        console.error('Error fetching user details', error);
      }
    });
  }
  updateInputFields() {
    if (this.userData && this.userData.dataDatails && this.userData.dataDatails.length > 0) {
      const userDetails = this.userData.dataDatails[0];


      this.firstnameContent = userDetails.t5_first_name;
      this.lastNameContent = userDetails.t5_last_name;
      this.EmailContent = userDetails.t5_email;
      this.PhoneContent = userDetails.t5_mobile_no;
      this.addressContent = userDetails.t5_address_1;
      this.pinContent = userDetails.t5_zip_code;

      // ... and so on for other fields
    }
  }

  saveChanges() {
    const userDetailsUpdate = {
      id_t5_m_users: this.id_t5_m_users,
      t5_first_name: this.firstnameContent,
      t5_last_name: this.lastNameContent,
      t5_address_1: this.addressContent,
      zipCode: this.pinContent,
      t5_mobile_no: this.PhoneContent,
      t5_email: this.EmailContent,
      profileImagePath: this.profileImagePath
    };
  
    this.ds.updateUserProfileDetails(userDetailsUpdate,this.action="edit", this.fake_name, this.pgm_id).subscribe({
      next: (response) => {
        console.log("data",userDetailsUpdate);
        console.log('Profile updated successfully', response);
        this.isEnable=false;
        // Handle successful update
      },
      error: (error) => {
        console.error('Error updating profile', error);
        // Handle error
      }
    });
  }
  

}