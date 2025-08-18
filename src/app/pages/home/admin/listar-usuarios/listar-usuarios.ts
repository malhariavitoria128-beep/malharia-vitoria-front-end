import { registerLocaleData } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../../../core/models/usuario/usuario.model';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { UsuarioService } from '../../../../services/usuario.service';
import { ApiResponse } from '../../../../core/models/api-response';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ComfirmDeleteDialog } from '../../../../components/layout/comfirm-delete-dialog/comfirm-delete-dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listar-usuarios',
  standalone: false,
  templateUrl: './listar-usuarios.html',
  styleUrl: './listar-usuarios.css'
})
export class ListarUsuarios implements OnInit, OnDestroy, AfterViewInit{

  filtro!: string;
  displayedColumns: string[] = ['nome', 'email', 'role', 'createdAt', 'isApproved', 'actions'];
  dataSource = new MatTableDataSource<Usuario>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>; // Referência ao template
  selectedUser: any; // Armazenará o usuário selecionado

  private destroy$ = new Subject<void>();

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService, private dialog: MatDialog, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

      this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.filtro = params.get('filtro') || 'pendentes'; // se não tiver, assume pendentes
        this.carregarUsuarios();
      });


    this.configurarFiltro();
  }

  ngAfterViewInit() {
    this.configurarDataSource();
  }




  private configurarDataSource() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

carregarUsuarios() {
  let request$: Observable<Usuario[]>;

  switch (this.filtro) {
    case 'todos':
      request$ = this.usuarioService.buscarTodosUsuarios();
      break;

    case 'aprovados':
      request$ = this.usuarioService.buscarUsuariosAprovados();
      break;

    default: // 'pendentes' (ou qualquer outro)
      request$ = this.usuarioService.buscarUsuariosPendentes();
      break;
  }

  request$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
        this.configurarDataSource();
      },
      error: (err) => {
        console.error('Erro ao carregar usuários', err);
      }
    });
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

   alterar(userId: string) {
    this.router.navigate(['admin/alterar-usuario', userId]);
  }

  alterarRole(novaRole: string, userId: any ) {
  this.usuarioService.changeRole(novaRole, userId).subscribe({
    next: () => {
      this.toastr.success(`Função alterada para ${novaRole}`, 'Sucesso');
      this.carregarUsuarios(); // função que atualiza os dados da tabela
    }
  });
}

  registrar() {
    this.router.navigate(['admin/registrar-usuario']);
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
