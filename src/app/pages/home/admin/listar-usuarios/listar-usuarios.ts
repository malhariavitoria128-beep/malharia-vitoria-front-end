import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../../../core/models/usuario/usuario.model';
import { Subject, take, takeUntil } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { UsuarioService } from '../../../../services/usuario.service';
import { ApiResponse } from '../../../../core/models/api-response';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ComfirmDeleteDialog } from '../../../../components/layout/comfirm-delete-dialog/comfirm-delete-dialog';

@Component({
  selector: 'app-listar-usuarios',
  standalone: false,
  templateUrl: './listar-usuarios.html',
  styleUrl: './listar-usuarios.css'
})
export class ListarUsuarios implements OnInit, OnDestroy, AfterViewInit{

  displayedColumns: string[] = ['nome', 'email', 'role', 'createdAt', 'isApproved', 'actions'];
  dataSource = new MatTableDataSource<Usuario>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>; // Referência ao template
  selectedUser: any; // Armazenará o usuário selecionado

  private destroy$ = new Subject<void>();

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService, private dialog: MatDialog,) {}

  ngOnInit(): void {
    this.carregarUsuarios();
    this.configurarFiltro();
  }

  ngAfterViewInit() {
    this.configurarDataSource();
  }

  carregarUsuarios() {
    this.usuarioService.buscarUsuariosPendentes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (usuarios) => {
          this.dataSource.data = usuarios;
          this.configurarDataSource();
        }
      });
  }

  private configurarDataSource() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  configurarFiltro() {
    this.dataSource.filterPredicate = (data: Usuario, filter: string) => {
      const search = filter.trim().toLowerCase();
      return (
        (data.nome?.toLowerCase().includes(search) ?? false) ||
        (data.email?.toLowerCase().includes(search) ?? false) ||
        (data.role?.toLowerCase().includes(search) ?? false)
      );
    };
  }

  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  aprovar(usuarioId: string) {
    this.usuarioService.autorizarUsuario(usuarioId)
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, "Sucesso");
          this.carregarUsuarios();
        }
      });
  }

deletar(userId: string, userName: string) {
  const dialogRef = this.dialog.open(ComfirmDeleteDialog, { // Corrigido o nome do componente
    width: '450px',
    autoFocus: false, // Desativa o auto-foco
    data: { userName: userName },
    disableClose: true
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.usuarioService.deletarUsuario(userId).subscribe({
        next: (res) => {
          this.toastr.success(res.message);
          this.carregarUsuarios(); // Removida a vírgula incorreta
        }
      });
    }
  });
}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
