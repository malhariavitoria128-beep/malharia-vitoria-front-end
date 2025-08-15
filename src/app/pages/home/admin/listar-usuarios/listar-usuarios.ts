import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  position: number;
  name: string;
  role: string;
  email: string;
  mobile: string;
  date: string;
  salary: number;
  projects: number;
  avatar: string;
}

const USER_DATA: UserData[] = [
  { position: 1, name: 'Johnathan Deo', role: 'Seo Expert', email: 'r@gmail.com', mobile: '9786838', date: 'Thursday, January 2, 2020', salary: 12000, projects: 10, avatar: 'https://i.pravatar.cc/40?img=1' },
  { position: 2, name: 'Mark Zukerburg', role: 'Web Developer', email: 'mark@gmail.com', mobile: '8786838', date: 'Thursday, April 2, 2020', salary: 12000, projects: 10, avatar: 'https://i.pravatar.cc/40?img=2' },
  { position: 3, name: 'Sam Smith', role: 'Web Designer', email: 'sam@gmail.com', mobile: '7786838', date: 'Sunday, February 2, 2020', salary: 12000, projects: 10, avatar: 'https://i.pravatar.cc/40?img=3' },
  { position: 4, name: 'John Deo', role: 'Tester', email: 'john@gmail.com', mobile: '8786838', date: 'Monday, March 2, 2020', salary: 12000, projects: 11, avatar: 'https://i.pravatar.cc/40?img=4' },
  { position: 5, name: 'Genilia', role: 'Actor', email: 'genilia@gmail.com', mobile: '8786838', date: 'Saturday, May 2, 2020', salary: 12000, projects: 19, avatar: 'https://i.pravatar.cc/40?img=5' }
];


@Component({
  selector: 'app-listar-usuarios',
  standalone: false,
  templateUrl: './listar-usuarios.html',
  styleUrl: './listar-usuarios.css'
})
export class ListarUsuarios {

  displayedColumns: string[] = ['name', 'email', 'mobile', 'date', 'salary', 'projects', 'actions'];
  dataSource = new MatTableDataSource<UserData>(USER_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

onEdit() {

}

onDelete() {

}

}
